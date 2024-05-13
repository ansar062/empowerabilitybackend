const router = require("express").Router();
const { CreateLecture, GetLecture } = require("../Controllers/LectureController");

router.post("/addlecture/:courseid", CreateLecture);
router.get("/getlecture/:id", GetLecture);

module.exports = router;  