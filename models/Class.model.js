const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  // Whoever created the Class
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // The Skill to which the Class belongs
  skillId: {
    type: Schema.Types.ObjectId,
    ref: "Skill",
  },
  // The name of the Class
  title: {
    type: String,
    // required: true,
    trim: true,
  },
  // Used to differentiate between Class and Skill for search results
  objectType: {
    type: String,
  },
  // Where the Class is taking place (See Miro and chatGPT about leaflet.js)
  classLocation: {
    type: String,
  },
  // How long the Class lasts in minutes
  classDuration: {
    type: Number,
  },
  // What the Class is about
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  // How advanced the Class is
  level: {
    type: String,
    enum: ["Everyone", "Beginner", "Intermediate", "Advanced"],
    default: "Everyone",
    // required: true,
  },
  // An image that decorates the SkillClasses component
  classImage: {
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
