const router = require("express").Router();
const Class = require("../models/Class.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

/*------------------------------------ POST route to Class creation ---------------------------------------------*/

router.post("/class-creation", authenticateUser, async (req, res) => {
  const payload = req.body;

  try {
    const userId = req.user.userId;
        console.log("req.user.id at class creation: ", userId);
    const createdClass = await Class.create({
      title: payload.title,
      teacherId: userId,
      description: payload.description,
      skillId: payload.skillId,
    });
    res.status(201).json({ message: "Class created", class: createdClass });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


/*-------------------------------- GET route to fetch classes for a specific skill --------------------------------------*/
router.get("/classes", authenticateUser, async (req, res) => {
  try {
    const skillId = req.query.skillId;
    console.log("THIS IS THE SKILLID FOR THE CLASSES ",skillId);

    const classes = await Class.find({skillId: skillId});
    console.log("These are the classes: ", classes);

    res.status(200).json({ classes: classes });

  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json(error);
  }
});
module.exports = router;
