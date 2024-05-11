const Freelancer = require("../Models/Freelancer");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.SetUpFreelancerProfile = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const {
      address,
      availability,
      education,
      experience,
      hourlyRate,
      phoneNumber,
      portfolioLink,
      skills,
      firstname,
      lastname,
    } = req.body;
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        await User.findByIdAndUpdate(info.id, {firstname, lastname})
        await Freelancer.create({
          baseUser: info.id,
          address,
          availability,
          education,
          experience,
          hourlyRate,
          phoneNumber,
          portfolioLink,
          skills,
        });
        return res.json({
          status: true,
          message: "Profile Setup Successfully",
        });
      });
    }
  } catch (err) {}
};

module.exports.EditFreelancerProfile = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const {
      address,
      availability,
      education,
      exp,
      hourlyRate,
      phoneNumber,
      portfolioLink,
      skills,
      firstname,
      lastname
    } = req.body;
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const updatedFields = {
          address,
          availability,
          education,
          exp,
          hourlyRate,
          phoneNumber,
          portfolioLink,
          skills,
        };
        await User.findByIdAndUpdate(info.id, {firstname, lastname})
        const freelancerProfile = await Freelancer.findOne({baseUser:info.id});
        const profile = await freelancerProfile.updateOne(updatedFields);

        return res.json({
          status: true,
          message: "Profile Updated Successfully",
          profile,
        });
      });
    }
  } catch (err) {}
};

module.exports.GetFreelancerProfile = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;

        const freelancerProfile = await Freelancer.findOne({ baseUser: info.id });
        const user = await User.findById(info.id);
        if(freelancerProfile){
          return res.json({
            status: true,
            freelancerProfile,
            user
          });
        }else{
          return res.json({
            status: false,
          });
        }
        
        
      });
    }
  } catch (err) {}
};
