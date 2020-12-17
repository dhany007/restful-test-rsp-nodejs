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
  destination: path.join(__dirname, '../../uploads/rooms'),
  filename (req, file, cb) {
    cb(null, `ROOM_${req.body.room_name}${path.extname(file.originalname)}`)
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
