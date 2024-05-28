const mongoose = require("mongoose");
const Schema = mongoose;

const tutorSchema = new mongoose.Schema({
    baseUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expertise:{
        type: String,
        required: true
    },
    teachingExperience: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    languages: [
        {
            type: String,
            required: true
        }
    ],
    specialNeeds: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("Tutor", tutorSchema);
