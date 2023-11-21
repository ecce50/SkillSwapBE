const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  firstname: {
    type: String,
    // required: true,
    trim: true,
  },
  lastname: {
    type: String,
    // required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    postcode: { type: String },
  },
  userImage: {
    type: String,
  },
  pointsBalance: {
    type: Number,
    default: 0,
  },
  // creditCardRef: {
  // type: String,
  // },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  messages: [
    {
      messageId: String,
      senderId: String,
      receiverId: String,
      content: String,
      timeStamp: {
        type: Date,
        default: Date.now,
      },
      IsSystemMessage: Boolean,
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
