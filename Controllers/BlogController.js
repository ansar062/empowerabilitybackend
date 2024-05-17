const Blog = require("../Models/BlogModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require('fs');

module.exports.CreateBlog = async (req, res, next) => {
  try {
    const { title, content, cover } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({ status: false, message: "No token" });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        if(!cover){
          return res.json({status: false, message: "Cover is required"})
        }
        if(!title){
          return res.json({status: false, message: "Title is required"})
        }if(!content){
          return res.json({status: false, message: "Content is required"})
        }
        await Blog.create({
          title,
          content,
          cover,
          author: info.id,
        });
        return res.json({
          status: true,
          message: "Blog created successfully",
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports.DeleteBlog = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { id } = req.params;
    if (!token) {
      return res.json({ status: false });
    }else{
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const blogdoc = await Blog.findById(id).populate('author', ["_id"]);
        if(blogdoc.author._id.equals(info.id)){
          
          await Blog.findByIdAndDelete(id);
          return res.json({message: "deleted", status: true})
        }
        res.json({
          message: "you are not author"
        })
      });
    }
  }catch(err){
    res.json(err)
  }
}
module.exports.PutBlog = async (req, res) => {
  try {
    const { id, title, content, cover } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    

    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const blogdoc = await Blog.findById(id);
        console.log(blogdoc);
        if(blogdoc.author._id.equals(info.id)){
          const updateFields = {
            title,
            content,
          };
          if (cover) {
            updateFields.cover = cover;
          }
          await blogdoc.updateOne(updateFields)
          return res.json({
            status: true,
            message: "Blog updated successfully",
            blogdoc,
          });
        }
        res.json({
          message: 'You are not author',
        })
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.GetBlogs = async (req, res) => {
  
  try {
    return res.json(await Blog.find().sort({updatedAt: -1}).populate("author", ["username"]));
  } catch (error) {
    console.error(error);
  }
};

module.exports.GetSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", ["username"]);
    return res.json(blog);
  } catch (err) {
    return res.json(err);
  }
};
