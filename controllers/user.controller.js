import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";
import transporter from "../config/mailing.js";

export async function register(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    if (!firstName || !lastName || !username || !email || !password)
      return res.status(403).json({ error: "all fields required" });

    const emailCheck = await User.findOne({ email: email });
    if (emailCheck)
      return res.status(403).json({ error: "user with this email exists" });

    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck)
      return res.status(403).json({ error: "user with this username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUsername = username.toLowerCase().replace(/\s/g, "");
    await User.create({
      firstName,
      lastName,
      username: updatedUsername,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return res.status(403).json({ error: "all fields required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(403).json({ error: "user doesn't exist" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(403).json({ error: "password doesn't match" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function logout(req, res) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ error: "access denied" });

  const token = authHeader.split(" ")[1];

  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted)
    return res.status(400).json({ error: "Already logged out" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(403).json({ error: "user not found" });

    const blacklist = new Blacklist({ token, userId: user._id });
    await blacklist.save();
    res.status(200).json({ message: "You are logged out!" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword)
      return res.status(400).json({ error: "all fields required" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ error: "user not found" });

    if (oldPassword === newPassword)
      return res
        .status(400)
        .json({ error: "new password cant be same as old password" });

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: "old password doesn't match" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function resetPasswordRequest(req, res) {
  const { username } = req.body;

  try {
    if (!username)
      return res.status(400).json({ error: "all fields required" });

    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ error: "no user found" });

    const email = user.email;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const link = `${process.env.AUTH_BASE_URL}/password-reset-confirm/${token}`;

    transporter.sendMail(
      {
        from: process.env.GOOGLE_MAIL,
        to: email,
        subject: "Reset your password!",
        text: `Click this link:${link}`,
      },
      function (error, info) {
        if (error) throw new Error(error);
        console.log(`email sent successfully!`);
        console.log(info);
      }
    );

    res.status(200).json({ message: "password reset email sent!" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function resetPasswordConfirm(req, res) {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    if (!token) return res.status(400).json({ error: "token not provided" });

    if (!newPassword || !confirmPassword)
      return res.status(400).json({ error: "all fields required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(400).json({ error: "invaild or expired token" });

    const id = decoded.userId;
    const user = await User.findById(id);

    const comparePassword = await bcrypt.compare(newPassword, user.password)
    if(comparePassword) return res.status(400).json({error:"new password can't be same as old one"})

    if (newPassword !== confirmPassword)
      return res.status(400).json({ error: "both password should match" });

    const hashedPassword = await bcrypt.hash(confirmPassword, 10)
    user.password = hashedPassword
    await user.save()

    return res.status(200).json({message:"password reset successfully"})
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}
