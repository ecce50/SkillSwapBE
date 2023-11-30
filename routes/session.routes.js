const router = require ("express").Router();
const Session = require ("../models/Session.model");
const {isAuthenticated} = require ("../middlewares/jwt.middleware");


/*------------------------------------ POST route to Session creation ---------------------------------------------*/

router.post ("/session-creation", isAuthenticated, async (req, res) => {

const payload = req.body

try {
    
    const [day, month, year] = payload.date.split('-');
    const createDate = new Date (day, month -1, `202${year}`);

    const createSession = await Session.create({
        date: createDate,
        time: new Date (payload.time),
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




module.exports = router;