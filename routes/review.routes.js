const router = require("express").Router();
const Review = require("../models/Review.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

router.get("/reviews", async (req, res) => {
  try {
      const classId = req.query.classId;
      console.log("THIS IS THE CLASSID FOR THE REVIEWS ", classId);
      
    const reviews = await Review.find({ classId: classId });
      console.log("These are the reviews: ", reviews);
      
    res.status(200).json({ reviews: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create-review", authenticateUser, async (req, res) => {
  const payload = req.body;

  try {
    const createReview = await Review.create({
      reviewer: payload.reviewer,
      score: payload.score,
      content: payload.content,
      classId: payload.classId,
    });

    console.log("Review created", createReview);

    res
      .status(201)
      .json({ message: "Review created", session: createReview });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


module.exports = router;
