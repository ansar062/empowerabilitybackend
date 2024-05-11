const {SetUpFreelancerProfile, EditFreelancerProfile, GetFreelancerProfile} = require("../Controllers/FreelancerController");
const router = require("express").Router();

router.post("/set-up-profile", SetUpFreelancerProfile);
router.put("/edit-profile", EditFreelancerProfile);
router.get("/get-profile", GetFreelancerProfile);

module.exports = router;    
