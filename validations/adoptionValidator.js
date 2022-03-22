const { check, validationResult } = require('express-validator');

const generateAdoptionValidators = () => [
    check('user_id').notEmpty().isNumeric().isLength({ max: 50 }).withMessage("invalid user id"),
    check('pet_id').notEmpty().isNumeric().isLength({ max: 50 }).withMessage("invalid pet id"),
    check('date').notEmpty().isLength({ max: 50 }).withMessage("invalid date"),
]

const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
]

const updateAdoptionValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('user_id').notEmpty().isNumeric().isLength({ max: 50 }).withMessage("invalid user id"),
    check('pet_id').notEmpty().isNumeric().isLength({ max: 50 }).withMessage("invalid pet id"),
    check('date').notEmpty().isLength({ max: 50 }).withMessage("invalid date"),
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(404).json({
            "succes": false,
            "code": 404,
            "message": errors,
            "data": []
        });
    }
    next();
}

module.exports = {
    add: [
        generateAdoptionValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updateAdoptionValidators(),
        reporter
    ]
};