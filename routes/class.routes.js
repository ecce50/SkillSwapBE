const router = require("express").Router();
const Class = require("../models/Class.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

/*------------------------------------ POST route to Class creation ---------------------------------------------*/

router.post("/class-creation", authenticateUser, async (req, res) => {
  const payload = req.body;

  try {
    const userId = req.user.userId;
    console.log("req.user.id at class creation: ", userId);
    console.log("Create class payload:", payload);
    const createdClass = await Class.create({
      teacherId: userId,
      skillId: payload.skillId,
      title: payload.title,
      source: "class",
      // classLocation: from leaflet.js
      classDuration: payload.classDuration,
      description: payload.description,
      level: payload.level,
      classImage: payload.classImage,
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


/*-------------------------------- DELETE route delete a class ------------------------------------------------------------*/

router.delete("/delete-class/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  console.log("Delete class route: ", id);

  try {
    await Class.findByIdAndDelete({ _id: id });
    console.log("Class deleted successfully: ", id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error in Class Delete route:", error);
    res.status(500).json(error);
  }
});

/*---------------------------------------- PUT route to class UPDATE ------------------------------------------------*/

router.put("/update-class/:id", authenticateUser, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params; // Extract classId from the request parameters

  try {
    const updatedFields = req.body; // Extract all fields to update from the request body

    // Check if the user is the teacher of the class
    const classToUpdate = await Class.findOne({ _id: id, teacherId: userId });

    if (!classToUpdate) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Update each field in the class object
    Object.keys(updatedFields).forEach((key) => {
      classToUpdate[key] = updatedFields[key];
    });

    // Save the updated class
    await classToUpdate.save();

    res
      .status(200)
      .json({ message: "Class updated successfully", class: classToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
