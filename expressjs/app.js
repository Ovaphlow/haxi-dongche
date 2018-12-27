const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const log4js = require('log4js')

const config = require('./config')
const userRoute = require('./routes/userRoute')
const uploadRoute = require('./routes/uploadRoute')
const ledger05Route = require('./routes/ledger05Route')
const ledger06Route = require('./routes/ledger06Route')
const ledger07Route = require('./routes/ledger07Route')
const ledger08Route = require('./routes/ledger08Route')
const ledger09Route = require('./routes/ledger09Route')
const ledger10Route = require('./routes/ledger10Route')
const ledger11Route = require('./routes/ledger11Route')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'dateFile', filename: './log/haxi.log', daysToKeep: 90 }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'info' }
  }
})
const logger = log4js.getLogger()

const app = express()
app.set('env', config.app.env)

app.use(log4js.connectLogger(logger, { level: 'info' }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const user = require('./routes/user')
app.use('/api/common/user', user)

const dept = require('./routes/dept')
app.use('/api/common/dept', dept)

const common = require('./routes/common')
app.use('/api/common', common)

const commonExcel = require('./routes/excel')
app.use('/api/common', commonExcel)

const message = require('./routes/message')
app.use('/api/common/message', message)

// const schedule = require('./routes/schedule')
// app.use('/api/common/schedule', schedule)

app.post('/api/common/user/login', (req, res) => userRoute.login(req, res))

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

app.post('/api/ledger/05/', (req, res) => ledger05Route.save(req, res))
app.get('/api/ledger/05/', (req, res) => ledger05Route.list(req, res))
app.get('/api/ledger/05/:id', (req, res) => ledger05Route.get(req, res))
app.put('/api/ledger/05/:id', (req, res) => ledger05Route.update(req, res))

app.post('/api/ledger/06/', (req, res) => ledger06Route.save(req, res))
app.get('/api/ledger/06/', (req, res) => ledger06Route.list(req, res))
app.get('/api/ledger/06/:id', (req, res) => ledger06Route.get(req, res))
app.put('/api/ledger/06/:id', (req, res) => ledger06Route.update(req, res))

app.post('/api/ledger/07/', (req, res) => ledger07Route.save(req, res))
app.get('/api/ledger/07/', (req, res) => ledger07Route.list(req, res))
app.get('/api/ledger/07/:id', (req, res) => ledger07Route.get(req, res))
app.put('/api/ledger/07/:id', (req, res) => ledger07Route.update(req, res))

app.post('/api/ledger/08/', (req, res) => ledger08Route.save(req, res))
app.get('/api/ledger/08/', (req, res) => ledger08Route.list(req, res))
app.get('/api/ledger/08/:id', (req, res) => ledger08Route.get(req, res))
app.put('/api/ledger/08/:id', (req, res) => ledger08Route.update(req, res))

app.post('/api/ledger/09/', (req, res) => ledger09Route.save(req, res))
app.get('/api/ledger/09/', (req, res) => ledger09Route.list(req, res))
app.get('/api/ledger/09/:id', (req, res) => ledger09Route.get(req, res))
app.put('/api/ledger/09/:id', (req, res) => ledger09Route.update(req, res))

app.post('/api/ledger/10/', (req, res) => ledger10Route.save(req, res))
app.get('/api/ledger/10/', (req, res) => ledger10Route.list(req, res))
app.get('/api/ledger/10/:id', (req, res) => ledger10Route.get(req, res))
app.put('/api/ledger/10/:id', (req, res) => ledger10Route.update(req, res))

app.put('/api/ledger/11/review/', (req, res) => ledger11Route.review(req, res))
app.get('/api/ledger/11/review/', (req, res) => ledger11Route.list_review(req, res))
app.post('/api/ledger/11/', (req, res) => ledger11Route.save(req, res))
app.get('/api/ledger/11/', (req, res) => ledger11Route.list(req, res))
app.get('/api/ledger/11/:id', (req, res) => ledger11Route.get(req, res))
app.put('/api/ledger/11/:id', (req, res) => ledger11Route.update(req, res))

app.listen(config.app.port, () => {
  console.info(`服务器启动于端口 ${config.app.port}。`)
})
