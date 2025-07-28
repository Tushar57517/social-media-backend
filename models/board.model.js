import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    name: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);
export default Board;
