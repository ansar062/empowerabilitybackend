const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({message: "Welcome to Empower Ability Server"})
});

module.exports = router;  