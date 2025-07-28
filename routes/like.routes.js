import express from "express";
import { getLikes, likeToggle } from "../controllers/like.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getLikes);
router.get("/post/:id", verifyToken, likeToggle);

export default router;
