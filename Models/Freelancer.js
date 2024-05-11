const mongoose = require("mongoose");
const Schema = mongoose;

const freelancerSchema = new mongoose.Schema({
    baseUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    portfolioLink:{
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("Freelancer", freelancerSchema);
