const Question = require('../models/Question');
const User = require('../models/User');

const createQuestion = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem criar questões' });
        }

        const { question, alternatives, correctAlternativeIndex, phase } = req.body;

        const reqUser = req.user;

        const user = await User.findById(reqUser._id);

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

const getQuestions = async (req, res) => {
    try {
        const { phase } = req.query;

        if (!phase) {
            return res.status(400).json({ error: 'O parâmetro "phase" é obrigatório.' });
        }

        const questions = await Question.find({ phase });
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Erro ao obter questões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
}