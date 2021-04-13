const { check, validationResult } = require('express-validator')

const registerValidator = () => [
  check('name')
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Name is require")
    .bail(),
  check("monthly-budget")
    .notEmpty()
    .withMessage("Monthly is require")
    .bail(),
  check("days-per-week")
    .notEmpty()
    .withMessage("Days is require")
    .bail(),
  check("hours-per-day")
    .notEmpty()
    .withMessage("Hours is require")
    .bail(),
  check("vacation-per-year")
    .notEmpty()
    .withMessage("Vacation is require")
    .bail()
]

const reporter = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    const error = errors.array()
    res.render("../views/errors/error", { error, link:'profile' })
  } else {
    next()
  }
}

module.exports = {
  add: [
    registerValidator(),
    reporter
  ]
}
