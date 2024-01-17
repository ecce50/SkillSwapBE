const router = require("express").Router();
// const Skill = require("../models/Skill.model");
const User = require("../models/User.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

/*--------------------------------------------- Add Skill to User --------------------------------------------------*/

router.put("/add-skill", authenticateUser, async (req, res) => {
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

// Update user profile
router.put("/update", authenticateUser, async (req, res) => {
  const updatedFields = req.body;
   const userId = updatedFields.userId;

  try {
    console.log("User ID in the try of the update route ", userId);
        console.log("Updated fields in the try of the update route ", updatedFields);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put("/update-profile", authenticateUser, async (req, res) => {
  const { userId } = req.user;
  const { email, userImage } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { email, userImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;