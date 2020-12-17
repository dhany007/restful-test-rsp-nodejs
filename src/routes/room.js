const express = require('express')
const roomCont = require('../controllers/room')
const upload = require('../helpers/upload')

const route = express.Router()

route.post('/', upload.uploadRoom.single('photo'), roomCont.addRoom)

module.exports = route
