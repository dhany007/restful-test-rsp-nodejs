const moment = require('moment')
const multer = require('multer')
const path = require('path')

const storageProfil = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads/users'),
  filename (req, file, cb) {
    cb(null, `PROFIL_${req.body.email}${path.extname(file.originalname)}`)
  }
})
const uploadProfil = multer({
  storage: storageProfil,
  fileFilter (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg') {
      return callback(null, false)
    }
    return callback(null, true)
  }
})

const storageRoom = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename (req, file, cb) {
    cb(null, `ROOM-${req.body.room_name}-${moment(new Date()).format('YYYYMMDD')}`)
  }
})

const uploadRoom = multer({
  storage: storageRoom,
  fileFilter (res, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg') {
      return callback(null, false)
    }
    return callback(null, true)
  }
})

module.exports = { uploadProfil, uploadRoom }
