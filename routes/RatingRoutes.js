const express = require("express");
const router = express.Router();

const { ratingValidation } = require("../middlewares/ratingValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

const { addRating } = require("../controllers/RatingController");

router.post("/avaliation/:id", authGuard, ratingValidation(), validate, addRating);

module.exports = router;