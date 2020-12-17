const express = require('express')
const roomCont = require('../controllers/room')
const upload = require('../helpers/upload')
const valid = require('../helpers/validator')

const route = express.Router()

route.post(
  '/',
  upload.uploadRoom.single('photo'),
  valid.ruleAddRoom(),
  valid.validate,
  roomCont.addRoom
)

module.exports = route
