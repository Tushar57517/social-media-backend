import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:id", verifyToken, getComments);
router.post("/add/:id", verifyToken, addComment);
router.delete("/delete/:id", verifyToken, deleteComment);
router.patch("/update/:id", verifyToken, updateComment);

export default router;
