const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const JobApplication = require("../Models/JobApplicationModel");
const Jobs = require("../Models/JobModel");

module.exports.ApplyToJobApplication = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { jobId } = req.params;
    if (!token) {
      return res.json({ success: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const { resumeUrl, status, experience, contactNo } = req.body;
        const { postedBy } = await Jobs.findById(jobId);
        const jobapplication = await JobApplication.create({
          jobId,
          applicantId: info.id,
          resumeUrl,
          status,
          experience,
          contactNo,
          hirerId: postedBy,
        });
        await Jobs.findByIdAndUpdate(jobId, {
          $push: { applications: jobapplication._id },
        });
        return res.json({
          status: true,
          message: "Applied to Job Successfully",
          jobapplication,
        });
      });
    }
  } catch (err) {}
};

module.exports.jobseekergetallApplications = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({ success: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const applications = await JobApplication.find({
          applicantId: info.id,
        }).populate("jobId", ["title"]);
        return res.json({
          applications,
        });
      });
    }
  } catch (err) {}
};

module.exports.hirergetallApplications = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { hirerId } = req.params;
    if (!token) {
      return res.json({ success: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const applications = await JobApplication.find({ hirerId })
          .populate("hirerId", ["email"])
          .populate("applicantId", ["firstname", "lastname", "email"])
          .populate("jobId", ["title"]);

        return res.json({
          applications,
          message: "hello",
        });
      });
    }
  } catch (err) {}
};
