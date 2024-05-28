const {EditTutorProfile, GetTutorProfile, SetUpTutorProfile} = require("../Controllers/TutorController");
const router = require("express").Router();

router.post("/set-up-profile", SetUpTutorProfile);
router.put("/edit-profile", EditTutorProfile);
router.get("/getprofile", GetTutorProfile);

module.exports = router;    
