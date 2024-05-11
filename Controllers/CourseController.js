const Course = require("../Models/CourseModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports.CreateCourse = async (req, res, next) => {
  try {
    const { title, description, category, price, cover, difficultyLevel } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.json({ status: false, message: "No token" });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        console.log(title, description, category, price, cover, difficultyLevel, info.id);
        await Course.create({
          title,
          description,
          category,
          price,
          cover,
          publisher: info.id,
          difficultyLevel,
        });
        return res.json({
          status: true,
          message: "Course created successfully",
        });
      });
    }
  } catch (err) {
    res.json({ status: false, message: "Error" });
  }
};


module.exports.GetMyCourses = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({ status: false });
    }else{
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const courses = await Course.find({publisher: info.id}).populate('publisher', ["username"]);
        return res.json(courses);
      });
    }
}catch(err){
  res.json(err)}
}

module.exports.GetAllCourses = async (req, res) => {
  try{
    const courses = await Course.find({isPublished: false}).populate('publisher', ["username"]);
    return res.json(courses);
  }catch(err){
    res.json(err)
  }
}

module.exports.GetSingleCourse = async (req, res) => {
  try{
    const { id } = req.params;
    const course = await Course.findById(id).populate('publisher', ["username"]);
    return res.json(course);}
    catch(err){
      res.json(err)
    }
}

module.exports.DeleteCourse = async (req, res) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { id } = req.params;
    if (!token) {
      return res.json({ status: false });
    }else{
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const coursedoc = await Course.findById(id).populate('publisher', ["_id"]);
        if(coursedoc.publisher._id.equals(info.id)){
          
          await Course.findByIdAndDelete(id);
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