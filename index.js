import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import boardRoutes from "./routes/board.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("tiny"));
app.use("/uploads", express.static("uploads"));

app.use("/auth", userRoutes);
app.use("/posts", postRoutes);
app.use("/boards", boardRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
