const { check, validationResult } = require('express-validator');

const generateValidators = () => [
  check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage("User name can not be empty!")
    .bail()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!")
    .bail(),
  check('daily-hours')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Daily hours can not be empty!")
    .bail()
    .isNumeric({no_symbols: true})
    .withMessage("This filed accept just numbers")
    .bail(),
  check("total-hours")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Hours per job can not be empty!")
    .bail()
    .isNumeric({no_symbols: true})
    .withMessage("This filed accept just numbers")
    .bail(),
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    
    const { id } = req.params
    
    if (!errors.isEmpty()) {
        const error = errors.array()
        res.render('../views/errors/error', { error, id, link: 'job'})
    } else{
      next();
    }
}

module.exports = {
    add: [
        generateValidators(),
        reporter
    ]
};
