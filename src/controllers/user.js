/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken')
const auth = require('../helpers/auth')
const model = require('../models/index')
const mail = require('../helpers/sendEmail')

const Register = async (req, res) => {
  const { email, password } = req.body
  const photo = req.file

  try {
    const userExist = await model.users.findAll({ where: { email: email } })
    if (userExist.length > 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'email already registered'
      })
    }

    const hash = await auth.hashPassword(password)
    let urlPhoto = ''
    if (photo) {
      urlPhoto = `${req.protocol}://${req.hostname}:10010/uploads/users/${photo.filename}`
    }

    await model.users.create({
      email: email,
      password: hash,
      photo: urlPhoto,
      created_at: new Date(),
      updated_at: new Date()
    })

    // selesaikan pendaftaran, baru kemudian menerima email
    const title = 'Pendaftaran'
    const text = 'Selamat, kamu sudah terdaftar'
    mail.Send(email, title, text)

    return res.json({
      code: 200,
      status: 'success',
      message: 'success register user'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      code: 400,
      status: 'failed',
      message: error.message
    })
  }
}

const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userExist = await model.users.findAll({
      email: email
    })
    if (userExist.length === 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'user not found'
      })
    }
    // compare to password
    const isUser = await auth.comparePassword(password, userExist[0].password)
    if (!isUser) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'password not match'
      })
    }
    // define data for jwt
    const dataJWT = {
      email
    }
    const token = jwt.sign(dataJWT, process.env.jwtSecret, { expiresIn: '1h' })

    return res.json({
      code: 200,
      status: 'success',
      message: 'logged success',
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      code: 400,
      status: 'failed',
      message: error.message
    })
  }
}

module.exports = {
  Register,
  Login
}
