const router = require ("express").Router();
const Session = require ("../models/Session.model");
const {authenticateUser} = require ("../middlewares/jwt.middleware");


/*------------------------------------ POST route to Session creation ---------------------------------------------*/

router.post ("/session-creation", authenticateUser, async (req, res) => {

const payload = req.body

try {
    
    const [day, month, year] = payload.date.split('-');
    const createDate = new Date (day, month -1, `202${year}`);

    const createSession = await Session.create({
        date: createDate,
        // time: new Date (payload.time),
        time: payload.time,
        status: payload.status,
        pointsCost: payload.pointsCost,
        classId: payload.classId,
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

        const sessions = await Session.find({classId: classId});
        console.log("These are the sessions: ", sessions);


        res.status(200).json({ sessions: sessions });

    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json(error);
    }
})

/*-----------------------------------GET route to fetch session ID------------------------------------------------ */

router.get("/sessions/:sessionId", authenticateUser, async (req, res) => {

    try {
        const sessionId = req.params.sessionId;
        console.log("Received session ID:", sessionId);
        const session = await Session.findById(sessionId);



        if (!session) {
            return res.status(404).json({error: "Session not found"});
        }

        res.status(200).json({session: session});


    } catch (error) {
        console.error("Error fetching session by ID:", error);
    }

})


/*------------------------------------Put Route to Session UPDATE--------------------------------------------------

router.put("/:sessionId", authenticateUser, async (req, res) => {

    try {
        const payload = req.body
        const updatedSession = await Session.findByIdAndUpdate(req.params.sessionId, payload, {new: true})

        res.status(202).json({message: "Session Updated", session: updatedSession});

    } catch (error) {
        console.log("update session route error:", error)
        res.status(500).json(error);
        
    }

})
*/

/*-------------------------------------DELETE Route to Session DELETE-------------------------------------------------*/

router.delete("/:sessionId", authenticateUser, async (req, res) => {

    try {
        await Session.findByIdAndDelete(req.params.sessionId);
        
    } catch (error) {
        console.error("error in Session Delete route:", error);
        res.status(500).json(error);
    }

});




module.exports = router;