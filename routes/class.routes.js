const router = require("express").Router();
const Class = require("../models/Class.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

/* POST route to class creation */

router.post("/class-creation", isAuthenticated, async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}

  try {
    const userId = req.user.userId;
        console.log("req.user.id at class creation: ", userId);
    const createdClass = await Class.create({
      title: payload.title,
      teacherId: userId,
      description: payload.description,
    });
    res.status(201).json({ message: "Class created", class: createdClass });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
