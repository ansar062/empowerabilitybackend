const mongoose = require("mongoose");
const Schema = mongoose;

const lectureSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});


module.exports =  mongoose.model("Lecture", lectureSchema);