const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

/* POST route to signup */

router.post("/signup", async (req, res) => {
  const payload = req.body; // { email: 'someEmail', password '1234'}

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);

  try {
    await User.create({ email: payload.email, password: passwordHash });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/* POST route to login */
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
          expiresIn: "6h",
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

/* GET route to verify the JWT */

router.get("/verify", isAuthenticated, async (req, res) => {
  console.log("here is after the middleware, what JWT is giving us", req.payload);
  const currentUser = await User.findById(req.payload.userId)
  currentUser.password = "*******"
  res.json({ message: 'Token is valid: ', currentUser });
});

module.exports = router;
