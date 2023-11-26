const router = require("express").Router();
const Skill = require("../models/Skill.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

/* POST route to skill creation */

router.post("/skill-creation", isAuthenticated, async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}

  try {
   const createdSkill =  await Skill.create({ title: payload.title });
    res.status(201).json({ message: "Skill created", skill: createdSkill });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



module.exports = router;
