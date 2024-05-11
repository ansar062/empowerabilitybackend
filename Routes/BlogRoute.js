const { CreateBlog, GetBlogs, GetSingleBlog, PutBlog, DeleteBlog } = require("../Controllers/BlogController");
const router = require("express").Router();
const uploadMiddleware = require('../util/multer');


router.post("/createblog", uploadMiddleware.single('file'), CreateBlog);
router.get("/blogs", GetBlogs);
router.get('/blog/:id', GetSingleBlog)
router.put('/blog/edit', uploadMiddleware.single('file'), PutBlog)
router.delete('/blog/delete/:id', DeleteBlog)

module.exports = router;    





