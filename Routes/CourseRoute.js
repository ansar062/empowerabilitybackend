const {CreateCourse, GetMyCourses, GetAllCourses, GetSingleCourse, DeleteCourse, UpdateCourse} = require("../Controllers/CourseController");
const {buyCourse, getMyBuyedCourses, getsinglebuyedCourse} = require("../Controllers/BuyCourseController");
const router = require("express").Router();


router.post("/postacourse", CreateCourse);
router.get("/getmycourses", GetMyCourses);
router.get("/getallcourses", GetAllCourses);
router.get("/getcourse/:id", GetSingleCourse);
router.delete("/delete/course/:id", DeleteCourse);
router.put("/update/course/:id", UpdateCourse);

router.post("/buy/course/:id", buyCourse);
router.get("/getmybuyedcourses", getMyBuyedCourses);
router.get("/view/course/getsinglebuyedcourse/:id", getsinglebuyedCourse)

module.exports = router;
