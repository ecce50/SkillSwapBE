const router = require("express").Router();
const Skill = require("../models/Skill.model"); // Make sure to import your Skill model or use it as needed

router.get("/skill", async (req, res) => {
  const query = req.query.title;
 console.log("Original Query:", query);
  try {
    console.log("Original Query:", query);
    console.log("MongoDB Query:", { title: new RegExp(query, "i") });
    const results = await Skill.find({ title: new RegExp(query, "i") });
    res.json(results);
    console.log("These are the skill results: ", results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
