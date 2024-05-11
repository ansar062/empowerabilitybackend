const { Signup, Login, Logout, UserProfile } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
// router.get('/profile', userVerification)
router.post('/logout', Logout);
router.get('/profile', UserProfile)

module.exports = router;    
