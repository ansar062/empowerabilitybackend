const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { lastname, firstname, email, password, username, createdAt, role } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
      role,
      lastname,
      firstname,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user, token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "No User found", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect credentials", success: false });
    }
    const token = createSecretToken(user._id);
    const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      expire: expirationDate,
    });
    
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user, token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the "token" cookie
    res.json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error logging out", success: false });
  }
};

module.exports.UserProfile = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.clearCookie("token"); 
      return res.json({ status: false });
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, info) => {
        if (err) {
          res.clearCookie('token'); 
          return res.status(401).json({ message: 'Unauthorized' });
        };
        const user = await User.findById(info.id);
        return res.json({status: true, user})
    });
    }
  } catch (error) {
    res.json({ error });
  }

};

