const { body } = require("express-validator");

const ratingValidation = () => {
    return [
        body("ratingValue")
            .not()
            .equals("undefined")
            .withMessage("A avaliação do curso é obrigatória.")
            .isNumeric()
            .withMessage("A avaliação do curso deve ser um número.")
            .isInt({ min: 1, max: 5 })
            .withMessage("A avaliação do curso deve estar entre 1 e 5."),
    ];
};

module.exports = {
    ratingValidation,
}