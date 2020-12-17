const model = require('../models/index')
const addRoom = async (req, res) => {
  const roomName = req.body.room_name
  const roomCapacity = req.body.room_capacity
  const photo = req.file

  try {
    let urlPhoto = ''
    if (photo) {
      urlPhoto = `${req.protocol}://${req.hostname}:10010/uploads/rooms/${photo.filename}`
    }

    await model.rooms.create({
      room_name: roomName,
      room_capacity: roomCapacity,
      photo: urlPhoto,
      created_at: new Date(),
      updated_at: new Date()
    })

    return res.json({
      code: 200,
      status: 'success',
      message: 'success added room'
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
  addRoom
}
