const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../middlewares/jwt.middleware");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/*---------------------------------------- POST route to SIGNUP ---------------------------------------------------*/

router.post("/signup", async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);

  try {
    await User.create({ email: payload.email, password: passwordHash, objectType: "user" });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/*------------------------------------------------ POST route to LOGIN --------------------------------------------------*/
router.post("/login", async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}
  /* Check if the user exists */
  const potentialUser = await User.findOne({ email: payload.email });
  if (potentialUser) {
    /* Check if the password is correct */
    if (bcrypt.compareSync(payload.password, potentialUser.password)) {
      /* Sign the JWT */
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "24h",
        }
      );
      // Sending back the token to the front
      res.status(202).json({ token: authToken });
    } else {
      {
        res.status(403).json({ errorMessage: "Password and/or email invalid" });
      }
    }
  } else {
    {
      res.status(403).json({ errorMessage: "Password and/or email invalid" });
    }
  }
});

/*----------------------------------------- GET route to verify the JWT -------------------------------------------------*/

// router.get("/verify", authenticateUser, async (req, res) => {
//   try {
//     console.log("Before user lookup");
//     const currentUser = await User.findById(req.user.userId);
//     console.log("After user lookup");
//     // currentUser.password = "*******"; // Redacting sensitive information

//     console.log("Before sending response");
//     res.json({ message: "Token is valid: ", currentUser });
//   } catch (error) {
//     console.error("Error in /auth/verify route:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



router.get("/verify", authenticateUser, async (req, res) => {
  try {
    // Log the received token
    console.log("Received token:", req.headers.authorization);

    const currentUser = await User.findById(req.user.userId);
    currentUser.password = "*******"; // Redacting sensitive information
    res.json({ message: "Token is valid", currentUser });
  } catch (error) {
    console.error("Error in /auth/verify route:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});



module.exports = router;
