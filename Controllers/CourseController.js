const { default: axios } = require("axios");
const Course = require("../Models/CourseModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("../util/cloudinary");

module.exports.CreateCourse = async (req, res, next) => {
  try {
    const filepath = req.file.path;
    const result = await cloudinary.uploader.upload(filepath);
    return res.json({message: result})
  } catch (err) {
    res.json({ status: false, message: "Error" });
  }
};
