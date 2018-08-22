const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const log4js = require('log4js')

const config = require('./config')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const app = express()
app.set('env', config.app.env)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  logger.info(req.method, req.originalUrl)
  next()
})

const user = require('./routes/user')
app.use('/api/common/user', user)

const dept = require('./routes/dept')
app.use('/api/common/dept', dept)

const common = require('./routes/common')
app.use('/api/common', common)

const commonUpload = require('./routes/upload')
app.use('/api/common/upload', commonUpload)

// const commonExcel = require('./routes/excel')
// app.use('/api/common/excel', commonExcel)

// const schedule = require('./routes/schedule')
// app.use('/api/common/schedule', schedule)

app.listen(config.app.port, () => {
  logger.info(`服务器启动于端口 ${config.app.port}。`)
})
