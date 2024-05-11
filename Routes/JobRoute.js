const {PostAJob, AllJobs, GetMyJobs, DeleteAJob, GetSingleJob, UpdateAJob} = require("../Controllers/JobController");


const router = require("express").Router();

router.post("/post-a-job", PostAJob);
router.get("/all-jobs", AllJobs);
router.get("/all-my-jobs", GetMyJobs);
router.delete("/jobs/delete/:id", DeleteAJob);
router.get("/jobs/job/:id", GetSingleJob);
router.put("/job/edit/:id", UpdateAJob);

module.exports = router;


