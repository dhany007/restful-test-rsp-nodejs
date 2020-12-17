const express = require('express')
const userCont = require('../controllers/user')
const upload = require('../helpers/upload')

const route = express.Router()

route
  .post(
    '/register',
    upload.uploadProfil.single('photo'),
    userCont.Register
  )
  .post('/login', userCont.Login)

module.exports = route
