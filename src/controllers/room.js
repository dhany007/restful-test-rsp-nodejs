const addRoom = async (req, res) => {
  try {
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
