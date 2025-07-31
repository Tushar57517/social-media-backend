import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export async function createPost(req, res) {
  const { caption } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    const post = await Post.create({
      caption,
      owner: req.userId,
      content: req.file.path,
      publicId: req.file.filename,
    });
    res.status(201).json({ message: "post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function myPosts(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "user not found" });

    const posts = await Post.find({ owner: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function allPosts(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "user not found" });

    const posts = await Post.find({ owner: id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function updatePost(req, res) {
  const { caption } = req.body;
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { caption },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPost) {
      return res.send(404).json({ message: "post not found" });
    }
    res
      .status(200)
      .json({ message: "post updated successfully!", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const deletePost = await Post.findOne({ _id: id, owner: req.userId });
    if (!deletePost) return res.status(403).json({ error: "post not found" });

    if (deletePost.publicId) {
      cloudinary.uploader.destroy(deletePost.publicId);
    }

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}
