const router = require("express").Router();
const Skill = require("../models/Skill.model");
const Class = require("../models/Class.model");

router.get("/", async (req, res) => {
  const query = req.query.title;

  try {
    // Search both databases and retrieve results
console.log("Search query:", query);
const skillResults = await Skill.find({ title: new RegExp(query, "i") });
const classResults = await Class.find({ title: new RegExp(query, "i") });
console.log("Skill results:", skillResults);
console.log("Class results:", classResults);

    // Combine the results
    const results = [...skillResults, ...classResults];

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
