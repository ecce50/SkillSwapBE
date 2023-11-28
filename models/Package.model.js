const { Schema, model } = require("mongoose");

const packageSchema = new Schema({
   sessions: [{
    type: Schema.Types.ObjectId,
    ref: "Session",
    }],
    
});
const Package = model("Package", packageSchema);

module.exports = Package;
