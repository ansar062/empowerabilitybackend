const mongoose = require("mongoose");
const Schema = mongoose;

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: [true, "Feedback is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
}, {timestamps: true});

module.exports = mongoose.model("Feedback", feedbackSchema);