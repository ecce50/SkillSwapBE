const router = require("express").Router();
const Skill = require("../models/Skill.model");
const Class = require("../models/Class.model");

router.get("/", async (req, res) => {
  const query = req.query.title;
  const filter = req.query.filter;

  try {
    // Search both databases and retrieve results
    const skillResults = await Skill.find({ title: new RegExp(query, "i") });
    const classResults = await Class.find({ title: new RegExp(query, "i") });

    // Combine and filter the results based on the provided filter
    let results = [];

    if (filter === "skill") {
      results = skillResults;
    } else if (filter === "class") {
      results = classResults;
    } else {
      // Default: Search both databases and combine the results
      results = [...skillResults, ...classResults];
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
