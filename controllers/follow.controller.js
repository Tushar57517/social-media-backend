import Follow from "../models/follow.model.js";

export const followToggle = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(403).json({ error: "id not provided" });

    if (id === req.userId)
      return res.status(400).json({ error: "you can't follow yourself" });

    const follow = await Follow.findOne({
      follower: req.userId,
      following: id,
    });
    if (follow) {
      await Follow.findByIdAndDelete(follow._id)
      return res.status(200).json({ message: "unfollowed!" });
    }

    await Follow.create({ follower: req.userId, following: id });
    res.status(200).json({ message: "followed!" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
