const router = require("express").Router();
const { addFeedback, getAllFeedbacks } = require("../Controllers/FeedbackController");

router.post("/addfeedback", addFeedback);
router.get("/getallfeedbacks", getAllFeedbacks);

module.exports = router;