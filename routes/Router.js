const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/question", require("./QuestionRoutes"));
router.use("/api/rating", require("./RatingRoutes"));

router.get("/", (req, res) => {
    res.send("API, Working");
});

module.exports = router;
