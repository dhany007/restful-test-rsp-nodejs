const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const routerNav = require('./src/index')
const db = require('./src/models/index')
const utils = require('./src/helpers/utils')
const { CronJob } = require('cron')

require('dotenv').config()

const app = express()

const port = process.env.PORT || 10010
app.listen(port, () => console.log('Server listening on port', port))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(logger('dev'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// exsmple use cron job send email on 00.10
const job = new CronJob('10 0 * * *', async () => {
  await utils.scheduleEmailBooking()
}, null, true)
job.start()

db.sequelize.sync()

app.use(cors())
app.use('/', routerNav)

module.exports = app
