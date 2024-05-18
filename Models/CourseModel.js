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
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
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
    isPublished:{
        type: Boolean,
        default: false
    },

    Lecture: [{
        type: Schema.Types.ObjectId,
        ref: "Lecture"
    }],
    enrolledStudents: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    
})


module.exports = mongoose.model("Course", courseSchema);