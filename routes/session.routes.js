const router = require("express").Router();
const Session = require("../models/Session.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

/*------------------------------------ POST route to Session creation ---------------------------------------------*/

router.post("/session-creation", authenticateUser, async (req, res) => {
  const payload = req.body;

  try {
    const [day, month, year] = payload.date.split("-");
      const createDate = new Date(day, month - 1, `202${year}`);
    //   let adjustedYear;
    //   if (year.length === 2) {
    //     adjustedYear = `20${year}`; // Convert two-digit year to four-digit
    //   } else {
    //     adjustedYear = year; // Use the four-digit year as is
    //   }
    //   const createDate = new Date(adjustedYear, month - 1, day);
   
    const createSession = await Session.create({
      date: createDate,
      // time: new Date (payload.time),
      time: payload.time,
      status: payload.status,
      pointsCost: payload.pointsCost,
      classId: payload.classId,
      maxAttendees: payload.maxAttendees,
    });

    console.log("Session created", createSession);

    res
      .status(201)
      .json({ message: "Session created", session: createSession });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

/*---------------------------------GET route to fetch Sessions for a Class -------------------------------------- */

router.get("/sessions", authenticateUser, async (req, res) => {
  try {
    const classId = req.query.classId;

    const sessions = await Session.find({ classId: classId });
    console.log("Get sessions route: ", sessions);

    res.status(200).json({ sessions: sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json(error);
  }
});

/*------------------------------------Put Route to Session UPDATE--------------------------------------------------*/

router.put("/update-session/:id", authenticateUser, async (req, res) => {
  try {
    const payload = req.body;
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.sessionId,
      payload,
      { new: true }
    );

    res
      .status(202)
      .json({ message: "Session Updated", session: updatedSession });
  } catch (error) {
    console.log("update session route error:", error);
    res.status(500).json(error);
  }
});

/*-------------------------------------DELETE Route to Session DELETE-------------------------------------------------*/

router.delete("/delete-session/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  console.log("Delete sessions route: ", id);

  try {
    await Session.findByIdAndDelete({ _id: id });
    console.log("Session deleted successfully");

    // Send a success response to the client
    res.status(204).end(); // 204 No Content is appropriate for a successful DELETE
  } catch (error) {
    console.error("Error in Session Delete route:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
