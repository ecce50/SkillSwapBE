const router = require("express").Router();
// const Skill = require("../models/Skill.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//Add Skill to User

router.put("/add-skill", isAuthenticated, async (req, res) => {
 const userId = req.user.userId;
  const { skillId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { skills: skillId } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: "Skill added to user", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;