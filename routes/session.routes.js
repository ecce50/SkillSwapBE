const router = require("express").Router();
const Session = require("../models/Session.model");
const { authenticateUser } = require("../middlewares/jwt.middleware");

/*------------------------------------ POST route to Session creation ---------------------------------------------*/

router.post("/create-session", authenticateUser, async (req, res) => {
  const payload = req.body;

  try {
    // Parse the time string (HH:MM)
    // const [hours, minutes] = payload.time.split(":");
    //createDate.setUTCHours(hours, minutes);

    const createSession = await Session.create({
      teacherId: payload.teacherId,
      classId: payload.classId,
      dateTime: payload.dateTime,
      pointsCost: payload.pointsCost,
      // sessionLocation: from leaflet.js
      sessionDuration: payload.sessionDuration,
      maxAttendees: payload.maxAttendees,
      notes: payload.notes,
    });

    console.log("Session created", createSession);

    res.status(201).json({ message: "Session created", session: createSession });
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

    /* res.status(200).json({ sessions: sessions }); */
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json(error);
  }
});

/*------------------------------------Put Route to Session UPDATE--------------------------------------------------*/

router.put("/update-session/", authenticateUser, async (req, res) => {
  const updatedFields = req.body;
  const sessionId = req.body.sessionId;

  try {
    console.log("Session ID in the try of the update route ", sessionId);
    console.log(
      "Updated fields in the try of the update route ",
      updatedFields
    );

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $set: updatedFields },
      { new: true }
    );

    if (updatedSession) {
      res.status(200).json({
        message: "Session updated successfully",
        session: updatedSession,
      });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.patch("/add-attendee/", authenticateUser, async (req, res) => {
  const updatedFields = req.body;
  const sessionId = req.body.sessionId;

  try {
    console.log("Session ID in the try of the update route ", sessionId);
    console.log(
      "Updated fields in the try of the update route ",
      updatedFields
    );

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: updatedFields },
      { new: true }
    );

    if (updatedSession) {
      res.status(200).json({
        message: "Session updated successfully",
        session: updatedSession,
      });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.patch("/remove-attendee/", authenticateUser, async (req, res) => {
  const { signedUp, sessionId } = req.body;

  try {
    console.log("Session ID in the try of the remove route ", sessionId);
    console.log("User ID to remove from signedUp array ", signedUp);

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $pull: { signedUp: signedUp } },
      { new: true }
    );

    if (updatedSession) {
      res.status(200).json({
        message: "Session updated successfully",
        session: updatedSession,
      });
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

/*-------------------------------------DELETE Route to Session DELETE-------------------------------------------------*/
// adding comment to make new push - delete after
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
