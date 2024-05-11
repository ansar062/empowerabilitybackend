const { CreateBlog, GetBlogs, GetSingleBlog, PutBlog, DeleteBlog } = require("../Controllers/BlogController");
const router = require("express").Router();


router.post("/createblog", CreateBlog);
router.get("/blogs", GetBlogs);
router.get('/blog/:id', GetSingleBlog)
router.put('/blog/edit', PutBlog)
router.delete('/blog/delete/:id', DeleteBlog)

module.exports = router;    





