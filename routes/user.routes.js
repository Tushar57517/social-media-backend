import express from "express";
import {
  changePassword,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.patch("/change-password", verifyToken, changePassword);

export default router;
