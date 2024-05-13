const Lecture = require("../Models/LecturesModel");
const Course = require("../Models/CourseModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.CreateLecture = async (req, res, next) => {
    try {
        const { title, video } = req.body;
        const { courseid } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
        return res.json({ status: false, message: "No token" });
        } else {
        jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
            if (err) throw err;
            const lecture = await Lecture.create({
            title,
            video,
            });
            await Course.findByIdAndUpdate(courseid, {
                $push: { Lecture: lecture._id },
              });
            return res.json({
            status: true,
            message: "Lecture created successfully",
            });
        });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.DeleteLecture = async (req, res) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const { id } = req.params;
        if (!token) {
        return res.json({ status: false });
        }else{
        jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
            if (err) throw err;
            const lecturedoc = await Lecture.findById(id).populate('course', ["author"]);
            if(lecturedoc.course.author.equals(info.id)){
            
            await Lecture.findByIdAndDelete(id);
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

module.exports.PutLecture = async (req, res) => {
    try {
        const { id, title, video, course } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
        return res.json({ status: false });
        }else{
        jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
            if (err) throw err;
            const lecturedoc = await Lecture.findById(id).populate('course', ["author"]);
            if(lecturedoc.course.author.equals(info.id)){
            
            await Lecture.findByIdAndUpdate(id, {
                title,
                video,
                course,
            });
            return res.json({message: "updated", status: true})
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

module.exports.GetLecture = async (req, res) => {
    try{
        const { id } = req.params;
        const lecture = await Lecture.findById(id);
        return res.json(lecture);
    }catch(err){
        res.json(err)
    }
}