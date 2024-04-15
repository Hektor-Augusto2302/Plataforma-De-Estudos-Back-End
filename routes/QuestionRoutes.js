const express = require("express");
const router = express.Router();

const { createQuestion, getQuestions, getQuestionsByPhase, updateQuestion, deleteQuestion } = require("../controllers/QuestionController");
const authGuard = require("../middlewares/authGuard");
const { questionCreateValidation } = require("../middlewares/questionValidation");
const validate = require("../middlewares/handleValidation");

router.post("/create", authGuard, questionCreateValidation(), validate, createQuestion);
router.get("/", authGuard, getQuestions)
router.get("/byPhase", authGuard, getQuestionsByPhase);
router.put("/update/:id", authGuard, updateQuestion);
router.delete("/:id", authGuard, deleteQuestion);

module.exports = router;