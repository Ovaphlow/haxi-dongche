const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const log4js = require('log4js')

const config = require('./config')

const app = express()

const logger = log4js.getLogger()
logger.level = config.app.logLevel

app.set('env', config.app.env)

// let staticPath = path.join(__dirname, '../webpack/dist')
// app.use(express.static(staticPath))
// logger.info(`静态目录：${staticPath}`)

// app.use('/lib', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json)

// app.use('/api', (req, res, next) => {
//   logger.info(req.method, req.originalUrl)
//   next()
// })

app.use('/api/test', (req, res) => {
  logger.info(1123)
  res.json({ status: 200 })
})

const user = require('./routes/user')
app.use('/api/user', user)

app.listen(config.app.port, () => {
  logger.info(`服务器启动于端口 ${config.app.port}。`)
})