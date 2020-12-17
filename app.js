const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const routerNav = require('./src/index')
const db = require('./src/models/index')

const app = express()

const port = 10010
app.listen(port, () => console.log('Server listening on port', port))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(logger('dev'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

db.sequelize.sync()

app.use(cors())
app.use('/', routerNav)

module.exports = app
