const express = require('express')
const bookingCont = require('../controllers/booking')

const route = express.Router()

route
  .get('/available-room', bookingCont.availableRoom)
  .post('/', bookingCont.bookingRoom)
  .post('/check-in', bookingCont.checkIn)

module.exports = route
