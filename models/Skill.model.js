const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  source: {
    type: String,
    default: "skill",
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
});

const Skill = model("Skill", skillSchema);

module.exports = Skill;
