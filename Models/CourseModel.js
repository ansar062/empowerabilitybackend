const mongoose = require("mongoose");
const Schema = mongoose;

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String,
        required: [true, "Please provide the course description"]
    },
    category: {
        type: String,
        required: true
    },
    // done
    video: {
        type: Object,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    cover: {
        type: Object,
        required: true
    },
    publisher:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    difficultyLevel:{
        type: String,
        required: true
    },
    assignments: [{
        type: String,
        required: true
    }]
})


module.exports = mongoose.model("Course", courseSchema);