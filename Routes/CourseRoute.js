const {CreateCourse} = require("../Controllers/CourseController");
const router = require("express").Router();


router.post("/postacourse", CreateCourse);


module.exports = router;