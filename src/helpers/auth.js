const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(8)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const comparePassword = async (password, userPassword) => {
  const valid = await bcrypt.compare(password, userPassword)
  return valid
}

const decodeToken = async (token) => {
  return jwt.decode(token)
}

const Access = async (req, res, next) => {
  const headerSecret = req.headers.token

  jwt.verify(headerSecret, process.env.jwtSecret, (err) => {
    if (err && err.name === 'TokenExpiredError') {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'token expired'
      })
    }
    if (err && err.name === 'JsonWebTokenError') {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'token invalid'
      })
    }
    return next()
  })
}

module.exports = {
  hashPassword,
  comparePassword,
  Access,
  decodeToken
}
