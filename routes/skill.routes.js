const router = require("express").Router();
const Skill = require("../models/Skill.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

/*--------------------------------------- POST route to skill creation --------------------------------------------*/

router.post("/skill-creation", isAuthenticated, async (req, res) => {
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
