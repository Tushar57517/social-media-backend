import express from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  allPosts,
  createPost,
  deletePost,
  myPosts,
  updatePost,
} from "../controllers/post.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/create", verifyToken, upload.single("content"), createPost);
router.get("/me", verifyToken, myPosts);
router.get("/:id", verifyToken, allPosts);
router.patch("/update/:id", verifyToken, updatePost);
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
