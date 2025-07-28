import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

export const getLikes = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).json({ error: "post id not provided" });
    const post = await Post.findById(id);

    if (!post) return res.status(400).json({ error: "post not found" });

    const likes = await Like.find({ post: id });
    const likesCount = likes.length;
    res.status(200).json({ likesCount, likes });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const likeToggle = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(404).json({ error: "id not provided" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "post not found" });

    const postExist = await Like.findOne({post:id, user:req.userId})
    if(postExist){
        await Like.deleteOne({post:id, user:req.userId})
        post.likeCount -=1;
        await post.save()
        return res.status(200).json({message:"post disliked!"})
    }else{
        await Like.create({post:id, user:req.userId})
        post.likeCount +=1;
        await post.save()
        return res.status(200).json({message:"post liked!"})
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
