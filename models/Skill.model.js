const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    // required: true,
    trim: true,
  },
  // Used to differentiate between Class and Skill for search results
  objectType: {
    type: String,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  skillImage: {
    type: String,
    // required: true,
    trim: true,
  },
});

const Skill = model("Skill", skillSchema);

module.exports = Skill;
