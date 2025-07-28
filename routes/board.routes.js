import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { createBoard, deleteBoard, getBoards, getUserBoard, updateBoard } from "../controllers/board.controller.js";

const router = express.Router();

router.get("/me", verifyToken, getBoards);
router.get("/:id", verifyToken, getUserBoard);
router.post("/create", verifyToken, createBoard);
router.patch("/update/:id", verifyToken, updateBoard);
router.delete("/delete/:id", verifyToken, deleteBoard);

export default router;
