const express = require('express')
const roomCont = require('../controllers/room')

const route = express.Router()

route.post('/', roomCont.addRoom)

module.exports = route
