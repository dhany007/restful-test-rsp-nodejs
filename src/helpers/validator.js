const valid = require('express-validator')

const ruleAddRoom = () => [
  valid.body('room_name')
    .notEmpty().withMessage('room_name required'),
  valid.body('room_capacity')
    .notEmpty().withMessage('room_capacity required')
]

const ruleLogin = () => [
  valid.body('email')
    .notEmpty().withMessage('email required')
    .isEmail().withMessage('email invalid'),
  valid.body('password')
    .notEmpty().withMessage('password required')
]

const ruleAvailableRoom = () => [
  valid.query('booking_time')
    .notEmpty().withMessage('booking_time required')
]

const ruleBookingRoom = () => [
  valid.body('user_id')
    .notEmpty().withMessage('user_id required'),
  valid.body('room_id')
    .notEmpty().withMessage('room_id required'),
  valid.body('total_person')
    .notEmpty().withMessage('total_person required'),
  valid.body('booking_time')
    .notEmpty().withMessage('booking_time required')
]

const ruleCheckIn = () => [
  valid.body('booking_id')
    .notEmpty().withMessage('booking_id required')
]

const validate = (req, res, next) => {
  const errors = valid.validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(400).send({
    code: 400,
    status: 'failed',
    message: errors.errors[0].msg
  })
}

const validation = {
  validate,
  ruleAddRoom,
  ruleAvailableRoom,
  ruleLogin,
  ruleBookingRoom,
  ruleCheckIn
}

module.exports = validation
