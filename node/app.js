const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const log4js = require('log4js')

const config = require('./config')

const app = express()

const logger = log4js.getLogger()
logger.level = config.app.logLevel

app.set('env', config.app.env)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/lib', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json)

app.use('/', (req, res, next) => {
  logger.info(req.method, req.originalUrl)

  next()
})

app.listen(config.app.port, () => {
  logger.info(`服务器启动，端口 ${config.app.port}`)
})