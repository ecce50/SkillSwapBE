const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Everyone", "Beginner", "Intermediate", "Advanced"],
    default: "Everyone",
    // required: true,
  },
  pointsCost: {
    type: Number,
  },
  //   description: {
  //     type: String,
  //     trim: true,
  //   },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
