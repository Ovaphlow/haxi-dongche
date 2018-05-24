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
app.use('/api/user', user)

const dept = require('./routes/dept')
app.use('/api/dept', dept)

app.listen(config.app.port, () => {
  logger.info(`服务器启动于端口 ${config.app.port}。`)
})