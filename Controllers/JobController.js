const JobApplication = require("../Models/JobApplicationModel");
const Jobs = require("../Models/JobModel");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.AllJobs = async (req, res, next) => {
  const jobs = await Jobs.find({ expired: false });
  return res.json({ jobs });
};

module.exports.PostAJob = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const user = await User.findById(info.id);
        if (user.role != "employer") {
          return next(
            res.json({
              status: false,
              message: "You are not authorized to post a job",
            })
          );
        }
        const {
          title,
          description,
          category,
          country,
          city,
          location,
          fixedSalary,
          salaryFrom,
          salaryTo,
          company,
        } = req.body;
        if (
          !title ||
          !description ||
          !category ||
          !country ||
          !city ||
          !location ||
          !company
        ) {
          return next(
            res.json({
              status: false,
              message: "Please provide full job details.",
            })
          );
        }
        if ((!salaryFrom || !salaryTo) && !fixedSalary) {
          return next(
            res.json({
              status: false,
              message: "Please either provide fixed salary or ranged salary.",
            })
          );
        }
        if (salaryFrom && salaryTo && fixedSalary) {
          return next(
            res.json({
              status: false,
              message: "Cannot Enter Fixed and Ranged Salary together.",
            })
          );
        }
        const postedBy = user._id;
        const job = await Jobs.create({
          title,
          description,
          category,
          country,
          city,
          location,
          fixedSalary,
          salaryFrom,
          salaryTo,
          postedBy,
          company,
        });

        return res.status(200).json({
          status: true,
          message: "Job Posted Successfully!",
          job,
        });
      });
    }
  } catch (err) {
    return res.json({ err });
  }
};

module.exports.GetMyJobs = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({ success: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        const { role } = await User.findById(info.id);
        if (role != "employer") {
          return next(
            res.json({
              message: "Job Seeker not allowed to access this resource.",
            })
          );
        }
        const myJobs = await Jobs.find({ postedBy: info.id });
        return res.status(200).json({
          success: true,
          myJobs,
        });
      });
    }
  } catch (err) {
    return res.json({ err });
  }
};

module.exports.DeleteAJob = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { id } = req.params;
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const { role } = await User.findById(info.id);
        if (role != "employer") {
          return next(
            res.json({
              message: "Job Seeker not allowed to access this resource.",
            })
          );
        }

        const jobdoc = await Jobs.findById(id);
        if (!jobdoc) {
          return next(res.json({ message: "OOPS! Job not found." }));
        }
        const allApplication = jobdoc.applications;
        for(const application of allApplication){
          await JobApplication.findByIdAndDelete(application._id.toString())
        }
        await Jobs.findByIdAndDelete(id);
        return res.status(200).json({
          success: true,
          message: "Job Deleted!",
        });
      });
    }
  } catch (err) {}
};

module.exports.GetSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);
    if (!job) {
      return res.json({ message: "Job not found" });
    }
    return res.json({ success: true, job });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports.UpdateAJob = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const { role } = await User.findById(info.id);
        if (role === "Job Seeker") {
          return next(
            res.json({
              message: "Job Seeker not allowed to access this resource.",
            })
          );
        }
        const { id } = req.params;
        let job = await Jobs.findById(id);
        if (!job) {
          return next(res.json({ message: "OOPS! Job not found." }));
        }
        job = await Jobs.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        return res.status(200).json({
          success: true,
          message: "Job Updated!",
          job,
        });
      });
    }
  } catch (err) {}
};
