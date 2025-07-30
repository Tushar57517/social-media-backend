import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(404).json({ error: "id not provided" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "post not found" });

    const comments = await Comment.find({ post: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (!id) return res.status(404).json({ error: "id not provided" });

    if (!content)
      return res.status(404).json({ error: "all fields required!" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "post not found" });

    const comment = await Comment.create({
      post: id,
      user: req.userId,
      content,
    });
    res.status(201).json({ message: "comment added", comment });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(404).json({ error: "id not provided" });

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: "comment not found" });

    if (comment.user !== req.userId)
      return res
        .status(403)
        .json({ error: "no permission to delete the comment" });

    await Comment.deleteOne({ _id: id, user: req.userId });
    res.status(200).json({ error: "comment deleted!" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateComment = async (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  try {
    const comment = await Comment.findOne({ _id: id, user: req.userId });
    if (!comment)
      return res.status(403).json({ error: "no comment or access denied" });

    const updatedComment = await Comment.findByIdAndUpdate(id, updates, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({ message: "comment updated", updatedComment });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.log(error.message);
  }
};
