const Rating = require('../models/Rating');
const Question = require('../models/Question');

const addRating = async (req, res) => {
    try {
        const { ratingValue } = req.body;
        const { _id: userId, name: userName, email: userEmail } = req.user;
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }

        const rating = new Rating({
            questionId: question._id,
            userId,
            userName,
            userEmail,
            ratingValue
        });

        await rating.save();

        res.status(201).json({ message: 'Avaliação adicionada com sucesso', rating });
    } catch (error) {
        console.error('Erro ao fazer a avaliação:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    addRating,
};
