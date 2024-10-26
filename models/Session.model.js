const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  // Whoever created the Class
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // The Class to which the Session belongs
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  // The start time and date for the Session
  dateTime: {
    type: Date,
  },
  // How many points should be deducted from the User for attending
  pointsCost: {
    type: Number,
  },
  // Where the Session is taking place (JSON string)
  sessionLocation: {
    type: String,
  },
  // How long the Session lasts in minutes
  sessionDuration: {
    type: Number,
  },
  // The maximum number of people who can book
  maxAttendees: {
    type: Number,
  },
  // An array of those who have booked
  signedUp: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Text area where teacher can add Session-specific information
  notes: {
    type: String,
    trim: true,
  },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
