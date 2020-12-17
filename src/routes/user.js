const express = require('express')
const userCont = require('../controllers/user')
const upload = require('../helpers/upload')
const valid = require('../helpers/validator')

const route = express.Router()

route
  .post(
    '/register',
    upload.uploadProfil.single('photo'),
    valid.ruleLogin(),
    valid.validate,
    userCont.Register
  )
  .post('/login', valid.ruleLogin(), valid.validate, userCont.Login)

module.exports = route
