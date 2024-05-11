const mongoose = require("mongoose");
const Schema = mongoose;

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs',
        required: [true, "Job is required"],
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Applicant is required"]
    },
    hirerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Hirer is required"]
    },
    resumeUrl: {
        type: String,
        required: [true, "Resume is required"]
    },
    status:{
        type: String,
        default: 'Pending'
    },
    experience: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("JobApplication", jobApplicationSchema);