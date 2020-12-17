const availableRoom = async (req, res) => {
  try {
    return res.json({
      code: 200,
      status: 'success',
      message: 'success get available room',
      data: []
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
  try {
    return res.json({
      code: 200,
      status: 'success',
      message: 'success booking room'
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
  try {
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
