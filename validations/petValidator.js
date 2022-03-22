const { check, validationResult } = require('express-validator');

const generatePetValidators = () => [
    check('alias').notEmpty().isLength({ max: 50 }).withMessage("invalid alias"),
    check('type').isIn(['Dog', 'Cat']).withMessage("invalid type (Dog OR Cat)"),
    check('color').notEmpty().isLength({ max: 50 }).withMessage("invalid color"),
    check('notes').notEmpty().isLength({ max: 150 }).withMessage("invalid notes"),
]

const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
]

const updatePetValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('alias').isLength({ max: 50 }).withMessage("invalid alias"),
    check('type').isIn(['Dog', 'Cat']).withMessage("invalid type (Dog OR Cat)"),
    check('color').isLength({ max: 50 }).withMessage("invalid color"),
    check('notes').isLength({ max: 150 }).withMessage("invalid notes"),
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
        generatePetValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updatePetValidators(),
        reporter
    ]
};