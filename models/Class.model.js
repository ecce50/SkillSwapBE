const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const classSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  skillId: {
    type: Schema.Types.ObjectId,
    ref: "Skill",
  },
  title: {
    type: String,
    // required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    // required: true,
    trim: true,
  },
  reviews: [
    {
      reviewer: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      score: {
        type: Number,
       // required: true,
        min: 1, // Minimum allowed value
        max: 5, // Maximum allowed value
      },
      content: String,
      timeStamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Class = model("Class", classSchema);

module.exports = Class;
