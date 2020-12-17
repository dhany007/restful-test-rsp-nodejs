const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.email,
    pass: process.env.pass
  }
})
// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages')
  }
})

// send mail with defined transport object
const Send = async (email, title, message) => {
  return transporter.sendMail({
    from: process.env.email,
    to: email,
    subject: title,
    text: message
  })
}
module.exports = { Send }
