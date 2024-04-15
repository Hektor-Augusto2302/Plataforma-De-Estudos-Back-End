const { body } = require("express-validator");

const questionCreateValidation = () => {
    return [
        body("question")
            .isString()
            .withMessage("A pergunta é obrigatória.")
            .isLength({ min: 3 })
            .withMessage("A pergunta precisa ter no mínimo três caracteres."),
        body("alternatives")
            .isArray({ min: 4, max: 4 })
            .withMessage("Deve haver exatamente 4 alternativas.")
            .custom((value, { req }) => {
                const correctIndex = req.body.correctAlternativeIndex;
                if (!correctIndex || correctIndex < 0 || correctIndex >= value.length) {
                    throw new Error("O índice da alternativa correta é inválido.");
                }
                return true;
            }),
        body("correctAlternativeIndex")
            .isNumeric()
            .withMessage("O índice da alternativa correta é obrigatório.")
            .isInt({ min: 0, max: 3 })
            .withMessage("O índice da alternativa correta deve ser um número entre 0 e 3.")
    ];
};

module.exports = {
    questionCreateValidation
};
