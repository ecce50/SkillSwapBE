const router = require("express").Router();
const Skill = require("../models/Skill.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

/*--------------------------------------- POST route to skill creation --------------------------------------------*/

router.post("/create-skill", isAuthenticated, async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}

  try {
    const userId = req.user.userId;
    console.log("req.user.id at skill creation: ", userId)
    const createdSkill = await Skill.create({
      title: payload.title,
      teacherId: userId,
      description: payload.description,
    });
    res.status(201).json({ message: "Skill created", skill: createdSkill });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/update-skill/:id", isAuthenticated, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params; // Extract skillId from the request parameters
  const { title, description } = req.body;

  try {
    const skill = await Skill.findOne({ _id: id, teacherId: userId });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Update the skill with the new title and description
    skill.title = title;
    skill.description = description;

    // Save the updated skill
    await skill.save();

    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete skill route
router.delete("/delete-skill/:id", isAuthenticated, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params; // Extract skillId from the request parameters

  try {
    const skill = await Skill.findOne({ _id: id});

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Delete the skill
    await skill.deleteOne();

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/*------------------------------------------ GET route to fetch skills by teacherId -------------------------------------*/
router.get("/skills", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId;
    const skills = await Skill.find({ teacherId: userId });
    console.log("Skills:", skills); // Log the skills array
    res.header("Content-Type", "application/json");
    res.status(200).json({ skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
