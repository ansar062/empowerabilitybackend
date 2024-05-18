const Course = require("../Models/CourseModel");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Stripe } = require("stripe");

module.exports.buyCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!id) {
      return res.json({
        status: false,
        message: "Please provide course id.",
      });
    }
    if (!token) {
      return res.json({ status: false, message: "No token" });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const user = await User.findById(info.id);
        const course = await Course.findById(id);
        if (user.role != "client") {
          return res.json({
            status: false,
            message: "You are not authorized to buy a course",
          });
        }
        if (!course) {
          return res.json({
            status: false,
            message: "Course not found",
          });
        }
        if (course.enrolledStudents.includes(user._id)) {
          return res.json({
            status: false,
            message: "You already have this course",
          });
        }
        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // const session = await stripe.checkout.sessions.create({
        //   payment_method_types: ["card"],
        //   mode: "payment",
        //   success_url: `http://localhost:3000/payment-success`,
        //   cancel_url: `http://localhost:3000/courses`,
        //   line_items:[
        //     {
        //         price_data:{
        //             currency: "usd",
        //             product_data:{
        //                 name: course.title,
        //                 description: `You are going to buy ${course.title}`,
        //             },
        //             unit_amount: course.price * 100
        //         },
        //         quantity: 1
        //     }
        //   ]
        // });
        await Course.findByIdAndUpdate(id, {
          $push: { enrolledStudents: user._id },
        });
        return res.json({ message: `You are now redirecting to payment gateway`,session:session.url });
      });
    }
  } catch (err) {
    res.json({ status: false, message: "Error" });
  }
};


module.exports.getMyBuyedCourses = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
        return res.json({ status: false, message: "No token" });
        } else {
        jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
            if (err) throw err;
            const user = await User.findById(info.id);
            const courses = await Course.find({ enrolledStudents: user._id });
            return res.json({ status: true, courses });
        });
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports.getsinglebuyedCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
        return res.json({ status: false, message: "No token" });
        } else {
        jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
            if (err) throw err;
            const user = await User.findById(info.id);
            const course = await Course.findById(id).populate('publisher', ["username", "firstname", "lastname", "email"]).populate('Lecture', ["title", "video"]);
            if (course.enrolledStudents.includes(user._id)) {
            return res.json({ status: true, course });
            } else {
            return res.json({ status: false, message: "You have not buyed this course" });
            }
        });
        }
    } catch (error) {
        console.error(error);
    }
}

