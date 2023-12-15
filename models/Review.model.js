const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
  classId: {
     type: Schema.Types.ObjectId,
    ref: "Class",
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
  },
  content: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  
}
);

const Review = model("Review", reviewSchema);

module.exports = Review;