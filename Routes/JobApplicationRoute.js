const {ApplyToJobApplication, jobseekergetallApplications, hirergetallApplications} = require("../Controllers/JobApplicationController")

const router = require("express").Router();

router.post("/api/jobs/:jobId/applications", ApplyToJobApplication);
router.get("/all-applications", jobseekergetallApplications);
router.get("/all-applications-request/:hirerId", hirergetallApplications);

module.exports = router;