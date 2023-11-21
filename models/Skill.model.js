const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
