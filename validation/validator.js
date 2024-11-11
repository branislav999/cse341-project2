const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('userId').isNumeric().withMessage('The userId must be a number'),
    body('email').isEmail().withMessage('The email must be a valid email'),
    body('languagesLearning').isArray().withMessage('The languagesLearning must be an array of languages'),
    body('completedLessons').isArray().withMessage('completedLessons must be an array of numbers'),
    body('points').isNumeric().withMessage('The points should be a number')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}