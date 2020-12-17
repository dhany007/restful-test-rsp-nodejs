/* eslint-disable array-callback-return */
const model = require('../models/index')
const mail = require('./sendEmail')

const scheduleEmailBooking = async () => {
  const dataUser = await model.sequelize.query(
    'SELECT a.email, b.id AS booking_id, b.booking_time FROM users a JOIN bookings b ON a.id = b.user_id WHERE CURDATE()',
    {
      type: model.sequelize.QueryTypes.SELECT
    }
  )
  if (dataUser.length === 0) {
    return
  }
  dataUser.map(e => {
    const title = 'Reminder Booking Room'
    const text = `Kamu booking room untuk tanggal ${e.booking_time} dengan Booking ID ${e.booking_id} `
    mail.Send(e.email, title, text)
  })
}

module.exports = { scheduleEmailBooking }
