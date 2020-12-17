const express = require('express')
const userRoutes = require('./routes/user')
const roomRoutes = require('./routes/room')
const bookingRoutes = require('./routes/booking')

const route = express.Router()

route
  .use('/users', userRoutes)
  .use('/rooms', roomRoutes)
  .use('/bookings', bookingRoutes)
  .use('/*', (req, res) => {
    return res.json('Hallo There')
  })

module.exports = route
