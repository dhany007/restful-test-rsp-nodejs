const express = require('express')
const bookingCont = require('../controllers/booking')
const auth = require('../helpers/auth')
const valid = require('../helpers/validator')

const route = express.Router()

route
  .get(
    '/available-room',
    auth.Access,
    valid.ruleAvailableRoom(),
    valid.validate,
    bookingCont.availableRoom
  )
  .post(
    '/',
    auth.Access,
    valid.ruleBookingRoom(),
    valid.validate,
    bookingCont.bookingRoom
  )
  .post(
    '/check-in',
    auth.Access,
    valid.ruleCheckIn(),
    valid.validate,
    bookingCont.checkIn
  )

module.exports = route
