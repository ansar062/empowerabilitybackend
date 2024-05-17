const router = require("express").Router();
const { CreateLecture, GetLecture, DeleteLecture } = require("../Controllers/LectureController");

router.post("/addlecture/:courseid", CreateLecture);
router.get("/getlecture/:id", GetLecture);
router.delete("/deletelecture/:id", DeleteLecture);

module.exports = router;  