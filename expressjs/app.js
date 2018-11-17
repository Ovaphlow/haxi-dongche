const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const log4js = require('log4js')

const config = require('./config')
const userRouter = require('./routes/userRouter')
const uploadRoute = require('./routes/uploadRoute')

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

// const commonUpload = require('./routes/upload')
// app.use('/api/common/upload', commonUpload)

const commonExcel = require('./routes/excel')
app.use('/api/common', commonExcel)

const message = require('./routes/message')
app.use('/api/common/message', message)

// const schedule = require('./routes/schedule')
// app.use('/api/common/schedule', schedule)

app.post('/api/common/user/login', (req, res) => userRouter.login(req, res))

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../webapp/public/upload')
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

app.post('/api/common/upload/carousel', upload.single('file'), (req, res) => {
  uploadRoute.UploadCarouselImage(req, res)
})

app.post('/api/common/upload/document/02/schedule', upload.single('file'), (req, res) => {
  uploadRoute.Document02UploadSchedule(req, res)
})

app.listen(config.app.port, () => {
  logger.info(`服务器启动于端口 ${config.app.port}。`)
})
