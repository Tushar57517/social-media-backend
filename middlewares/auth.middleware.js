import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ error: "access denied" });

  const token = authHeader.split(" ")[1];

  try {
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted)
      return res.status(401).json({ error: "token is blacklisted" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(403).json({ error: "token is invalid or expired" });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export default verifyToken;
