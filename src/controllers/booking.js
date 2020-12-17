const moment = require('moment')
const model = require('../models/index')
const mail = require('../helpers/sendEmail')
const auth = require('../helpers/auth')

const availableRoom = async (req, res) => {
  let bookingTime = req.query.booking_time

  try {
    bookingTime = moment(bookingTime).format('YYYY-MM-DD')
    const today = moment(new Date()).format('YYYY-MM-DD')
    const validBookingTime = moment(bookingTime).isAfter(today)
    if (!validBookingTime) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'booking time must be greater than today'
      })
    }

    const data = await model.sequelize.query(
      'SELECT * FROM rooms WHERE id NOT IN ( SELECT room_id FROM bookings WHERE DATE(booking_time) = :bookingTime)',
      {
        replacements: { bookingTime: bookingTime },
        type: model.sequelize.QueryTypes.SELECT
      }
    )

    if (data.length === 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'no available rooms',
        data: []
      })
    }

    return res.json({
      code: 200,
      status: 'success',
      message: 'success get available room',
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      code: 400,
      status: 'failed',
      message: error.message,
      data: []
    })
  }
}

const bookingRoom = async (req, res) => {
  const userId = req.body.user_id
  const roomId = req.body.room_id
  let totalPerson = req.body.total_person
  let bookingTime = req.body.booking_time
  const noted = req.body.noted

  try {
    const roomExist = await model.rooms.findAll({ where: { id: roomId } })
    if (roomExist.length === 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'room not found'
      })
    }

    bookingTime = moment(bookingTime).format('YYYY-MM-DD')
    const today = moment(new Date()).format('YYYY-MM-DD')
    const validBookingTime = moment(bookingTime).isAfter(today)

    if (!validBookingTime) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'booking time must be greater than today'
      })
    }

    const availableRoom = await model.sequelize.query(
      'SELECT * FROM bookings WHERE room_id = :id AND DATE(booking_time) = :bookingTime',
      {
        replacements: {
          id: roomId,
          bookingTime: bookingTime
        },
        type: model.sequelize.QueryTypes.SELECT
      }
    )

    if (availableRoom.length > 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'room not available'
      })
    }

    totalPerson = parseInt(totalPerson, 10)
    if (totalPerson > roomExist[0].dataValues.room_capacity) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'total person can not greater than room capacity'
      })
    }

    await model.bookings.create({
      user_id: userId,
      room_id: roomId,
      total_person: totalPerson,
      booking_time: bookingTime,
      noted: noted,
      created_at: new Date(),
      updated_at: new Date()
    })

    const dataBooking = await model.sequelize.query(
      'SELECT * FROM bookings WHERE room_id = :id AND user_id = :userId AND DATE(booking_time) = :bookingTime',
      {
        replacements: {
          id: roomId,
          userId: userId,
          bookingTime: bookingTime
        },
        type: model.sequelize.QueryTypes.SELECT
      }
    )

    // selesaikan bookingan, baru kemudian menerima email
    const dataUser = await auth.decodeToken(req.headers.token)
    const title = 'Booking Room'
    const text = `Kamu booking room untuk tanggal ${bookingTime} dengan Booking ID ${dataBooking[0].id} `
    mail.Send(dataUser.email, title, text)

    return res.json({
      code: 200,
      status: 'success',
      message: 'success booking room',
      data: dataBooking
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

const checkIn = async (req, res) => {
  const bookingId = req.body.booking_id

  try {
    const validBooking = await model.sequelize.query(
      'SELECT * FROM bookings WHERE id = :id AND check_in_time IS NULL',
      {
        replacements: {
          id: bookingId
        },
        type: model.sequelize.QueryTypes.SELECT
      }
    )

    if (validBooking.length === 0) {
      return res.status(400).send({
        code: 400,
        status: 'failed',
        message: 'booking id not found'
      })
    }

    await model.bookings.update({ check_in_time: new Date(), updated_at: new Date() }, {
      where: {
        id: bookingId
      }
    })
    return res.json({
      code: 200,
      status: 'success',
      message: 'success checkin room'
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
  availableRoom,
  bookingRoom,
  checkIn
}
