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
router.put("/update-user", authenticateUser, async (req, res) => {
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


// GET route to find a teacher's details
router.get("/userinfo", authenticateUser, async (req, res) => {
  try {
    const teacherId = req.query.teacherId;
    console.log("THIS IS THE TEACHERID BEING PASSED ", teacherId);

    const teacher = await User.findOne({ _id: teacherId });
    console.log("These are the classes: ", teacher);

    res.status(200).json({ teacher: teacher });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    // Handle the error here, you might want to send an error response
    res.status(500).json({ error: "Error fetching teacher" });
  }
});


/*--------------------------------------------- DELETE User --------------------------------------------------*/

router.delete("/delete-user/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  console.log("Delete user route: ", id);

  try {
    await User.findByIdAndDelete({ _id: id });
    console.log("User deleted successfully: ", id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in User Delete route:", error);

    res.status(500).json(error);
  }
});

module.exports = router;