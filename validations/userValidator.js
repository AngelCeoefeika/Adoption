const { check, validationResult } = require('express-validator');

const generateUserValidators = () => [
    check('name').notEmpty().isLength({ max: 50 }).withMessage("invalid name"),
    check('lastname').notEmpty().isLength({ max: 50 }).withMessage("invalid lastname"),
    check('phone').notEmpty().isLength({ min: 10, max: 10 }).withMessage("invalid phone [10 numbers]"),
    check('address').notEmpty().isLength({ max: 150 }).withMessage("invalid address"),
]

const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
]

const updateUserValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid id"),
    check('name').isLength({ max: 50 }).withMessage("invalid name"),
    check('lastname').isLength({ max: 50 }).withMessage("invalid lastname"),
    check('phone').isLength({ min: 10, max: 10 }).isNumeric().withMessage("invalid phone [10 numbers]"),
    check('address').isLength({ max: 150 }).withMessage("invalid address"),
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
        generateUserValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updateUserValidators(),
        reporter
    ]
};