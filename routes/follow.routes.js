import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { followToggle } from "../controllers/follow.controller.js";

const router = express.Router();

router.get("/:id", verifyToken, followToggle);

export default router;
