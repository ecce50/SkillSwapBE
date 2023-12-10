const { Schema, model } = require("mongoose");

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
  source: {
    type: String,
  },
  duration: {
    type: Number,
  },
  location: {
    type: String,
  }, //GeoJSON for when we add location functionality
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
