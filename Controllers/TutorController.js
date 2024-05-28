const Tutor = require("../Models/ToturModel");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.SetUpTutorProfile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {
      expertise,
      teachingExperience,
      bio,
      availability,
      languages,
      specialNeeds,
      firstname,
      lastname,
      image,
    } = req.body;
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        await User.findByIdAndUpdate(info.id, { firstname, lastname, image });
        await Tutor.create({
          baseUser: info.id,
          expertise,
          teachingExperience,
          bio,
          availability,
          languages,
          specialNeeds,
        });
        return res.json({
          status: true,
          message: "Profile Setup Successfully",
        });
      });
    }
  } catch (err) {}
};

module.exports.EditTutorProfile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {
        expertise,
        teachingExperience,
        bio,
        availability,
        languages,
        specialNeeds,
        firstname,
        lastname,
        image,
    } = req.body;
    console.log(req.body);
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;
        const updatedFields = {
            expertise,
            teachingExperience,
            bio,
            availability,
            languages,
            specialNeeds,
        };
        await User.findByIdAndUpdate(info.id, { firstname, lastname, image });
        const tutorProfile = await Tutor.findOne({
          baseUser: info.id,
        });
        const profile = await tutorProfile.updateOne(updatedFields);

        return res.json({
          status: true,
          message: "Profile Updated Successfully",
          profile,
        });
      });
    }
  } catch (err) {}
};

module.exports.GetTutorProfile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) throw err;

        const tutorProfile = await Tutor.findOne({
          baseUser: info.id,
        });
        const user = await User.findById(info.id);
        if (tutorProfile) {
          return res.json({
            status: true,
            tutorProfile,
            user,
          });
        } else {
          return res.json({
            status: false,
          });
        }
      });
    }
  } catch (err) {}
};
