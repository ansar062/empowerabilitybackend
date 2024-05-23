const Feedback = require("../Models/Feedback");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.addFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!feedback) {
      return res.json({
        status: false,
        message: "Please provide feedback.",
      });
    }
    if (!token) {
      return res.json({ status: false, message: "No token" });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const user = await User.findById(info.id);
        if(user.role !== "client"){
            return res.json({
                status: false,
                message: "You are not authorized to add feedback",
            });
        }
        const newFeedback = await Feedback.create({
            feedback,
            user: user._id,
        });
        return res.json({
          status: true,
          message: "Feedback added successfully",
          data: newFeedback,
        });
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};


module.exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({updatedAt: -1}).populate('user', ["username", "firstname", "lastname", "email"]);
        return res.json({
            status: true,
            data: feedbacks,
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error.message,
        });
    }
}
