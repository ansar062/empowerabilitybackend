const {CreateCourse, GetMyCourses, GetAllCourses, GetSingleCourse, DeleteCourse} = require("../Controllers/CourseController");
const router = require("express").Router();


router.post("/postacourse", CreateCourse);
router.get("/getmycourses", GetMyCourses);
router.get("/getallcourses", GetAllCourses);
router.get("/getcourse/:id", GetSingleCourse);
router.delete("/delete/course/:id", DeleteCourse);


module.exports = router;
