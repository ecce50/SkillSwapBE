const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const packageSchema = new Schema({
   sessions: [{
    type: Schema.Types.ObjectId,
    ref: "Session",
    }],
    
});
const Package = model("Package", packageSchema);

module.exports = Package;
