/* eslint-disable max-len */
const Sequelize = require('sequelize')

const config = require('../config/config')

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./users')(sequelize, Sequelize)
db.bookings = require('./bookings')(sequelize, Sequelize)
db.rooms = require('./rooms')(sequelize, Sequelize)

module.exports = db
