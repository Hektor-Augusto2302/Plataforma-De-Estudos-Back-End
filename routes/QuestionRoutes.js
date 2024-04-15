const express = require("express");
const router = express.Router();

const { createQuestion, getQuestions } = require("../controllers/QuestionController");
const authGuard = require("../middlewares/authGuard");
const { questionCreateValidation } = require("../middlewares/questionValidation");
const validate = require("../middlewares/handleValidation");

router.post("/create", authGuard, questionCreateValidation(), validate, createQuestion);
router.get("/", authGuard, getQuestions);

module.exports = router;