const express = require("express");
const router = express.Router();

const { createQuestion, getQuestions, getQuestionsByPhase, updateQuestion, deleteQuestion, checkAnswer } = require("../controllers/QuestionController");
const authGuard = require("../middlewares/authGuard");
const { questionCreateValidation, updateQuestionValidation } = require("../middlewares/questionValidation");
const validate = require("../middlewares/handleValidation");

router.post("/create", authGuard, questionCreateValidation(), validate, createQuestion);
router.post("/check/:id", authGuard, checkAnswer);
router.get("/", authGuard, getQuestions)
router.get("/byPhase", authGuard, getQuestionsByPhase);
router.put("/update/:id", authGuard, updateQuestionValidation(), validate, updateQuestion);
router.delete("/:id", authGuard, deleteQuestion);

module.exports = router;