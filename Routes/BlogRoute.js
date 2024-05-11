const { CreateBlog, GetBlogs, GetSingleBlog, PutBlog, DeleteBlog } = require("../Controllers/BlogController");
const router = require("express").Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadMiddleware = multer({storage});

router.post("/createblog", uploadMiddleware.single('file'), CreateBlog);
router.get("/blogs", GetBlogs);
router.get('/blog/:id', GetSingleBlog)
router.put('/blog/edit', uploadMiddleware.single('file'), PutBlog)
router.delete('/blog/delete/:id', DeleteBlog)

module.exports = router;    





