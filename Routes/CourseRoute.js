const {CreateCourse} = require("../Controllers/CourseController");
const router = require("express").Router();
const uploadMiddleware = require('../util/multer');


router.post("/postacourse",uploadMiddleware.single('file'), CreateCourse);


module.exports = router;