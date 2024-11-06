const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
    default: "Maria",
    // required: true,
    trim: true,
  },
  lastname: {
    type: String,
    // required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    maxlength: 20,
    minlength: 3,
  },
  objectType: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    // validate: {
    //   validator: function (v) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    //       v
    //     );
    //   },
    //   message: (props) => `${props.value} is not a valid password!`,
    // },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },

  // This isn't a String, but a Point object. See the print screen in Miro and the chatGPT conversation
  // userLocation: {
  //   type: Point,
  // },
  profileImage: {
    type: String,
    default: "",
  },
  pointsBalance: {
    type: Number,
    default: 0,
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  source: {
    type: String,
  },
  attendingSessions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
    default: [],
  },
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
