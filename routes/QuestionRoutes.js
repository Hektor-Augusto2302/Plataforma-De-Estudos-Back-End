const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion,
    checkAnswer,
    likeQuestion,
    commentQuestion
} = require("../controllers/QuestionController");
const authGuard = require("../middlewares/authGuard");
const { questionCreateValidation, updateQuestionValidation, commentValidation } = require("../middlewares/questionValidation");
const validate = require("../middlewares/handleValidation");

router.post("/create", authGuard, questionCreateValidation(), validate, createQuestion);
router.post("/check/:id", authGuard, checkAnswer);
router.get("/", authGuard, getQuestions)
router.put("/update/:id", authGuard, updateQuestionValidation(), validate, updateQuestion);
router.patch("/like/:id", authGuard, likeQuestion);
router.patch("/comment/:id", authGuard, commentValidation(), validate, commentQuestion);
router.delete("/:id", authGuard, deleteQuestion);

module.exports = router;