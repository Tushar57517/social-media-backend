import Board from "../models/board.model.js";
import User from "../models/user.model.js";

export async function getBoards(req, res) {
  try {
    const boards = await Board.find({ owner: req.userId });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function getUserBoard(req, res) {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "id not provided" });

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "user not found" });
    const boards = await Board.find({ owner: user._id });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function createBoard(req, res) {
  const { name, posts } = req.body;

  try {
    if (!name) return res.status(400).json({ error: "name field required" });
    const newBoard = await Board.create({
      name,
      owner: req.userId,
      posts,
    });
    return res
      .status(201)
      .json({ message: "new board created successfully!", newBoard });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function updateBoard(req, res) {
  const { id } = req.params;
  const updates = req.body;

  if (!id) return res.status(400).json({ error: "id not provided" });

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      {
        name: updates.name,
        ...(posts && posts.length > 0
          ? { $push: { posts: { $each: posts } } }
          : {}),
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedBoard) {
      return res.send(404).json({ message: "board not found" });
    }
    res
      .status(200)
      .json({ message: "board updated successfully!", post: updatedBoard });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function deleteBoard(req, res) {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).json({ error: "id not provided" });

    const board = await Board.findOne({ _id: id, owner: req.userId });
    if (!board) return res.status(400).json({ error: "board not found" });

    await Board.deleteOne({ _id: id });
    res.status(200).json({ message: "board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}
