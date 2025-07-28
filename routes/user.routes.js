import express from "express";
import {
  changePassword,
  login,
  logout,
  register,
  resetPasswordConfirm,
  resetPasswordRequest,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.patch("/change-password", verifyToken, changePassword);
router.post("/password-reset-request", resetPasswordRequest);
router.post("/password-reset-confirm/:token", resetPasswordConfirm);

export default router;
