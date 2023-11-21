const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const sessionSchema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    },
    
  //   description: {
  //     type: String,
  //     // required: true,
  //     trim: true,
  //   },

  date: {
    type: Date,
  },
  time: {
    type: Date,
  },
  duration: Number,
  location: String, //GeoJSON for when we add location functionality
  status: {
    type: String,
    enum: ["Everyone", "Beginner", "Intermediate", "Advanced"],
    default: "Everyone",
    // required: true,
  },
  pointsCost: Number,
});

const Session = model("Session", sessionSchema);

module.exports = Session;
