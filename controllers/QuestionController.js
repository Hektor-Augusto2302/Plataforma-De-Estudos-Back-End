const Question = require('../models/Question');
const User = require('../models/User');

const createQuestion = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await User.findById(reqUser._id);

        if (user !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem criar questões' });
        }

        const { question, alternatives, correctAlternativeIndex, phase } = req.body;

        const newQuestion = await Question.create({
            question,
            alternatives,
            correctAlternativeIndex,
            userId: user._id,
            userName: user.name,
            phase
        });

        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Erro ao criar questão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const getQuestionsByPhase = async (req, res) => {
    try {
        const phase = req.query.phase;
        const questions = await Question.find({ phase: phase });
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Erro ao obter questões por fase:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Erro ao obter questões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await User.findById(reqUser._id);

        if (user !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem atualizar questões' });
        }

        const questionId = req.params.id;
        const { question, alternatives, correctAlternativeIndex, phase } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { question, alternatives, correctAlternativeIndex, phase },
            { new: true }
        );

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Erro ao atualizar questão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const reqUser = req.user;

        const user = await User.findById(reqUser._id);

        if (user !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem excluir questões' });
        }

        const questionId = req.params.id;

        await Question.findByIdAndDelete(questionId);

        res.status(200).json({ message: 'Pergunta excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir questão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const checkAnswer = async (req, res) => {
    try {
        const questionId = req.params.id;
        const selectedAlternativeIndex = req.body.selectedAlternativeIndex;

        const question = await Question.findById(questionId);

        const isCorrect = selectedAlternativeIndex === question.correctAlternativeIndex;

        question.userAnswers.push({
            selectedAlternativeIndex,
            isCorrect
        });

        await question.save();

        res.status(200).json({ isCorrect });
    } catch (error) {
        console.error('Erro ao verificar resposta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionsByPhase,
    updateQuestion,
    deleteQuestion,
    checkAnswer,
}