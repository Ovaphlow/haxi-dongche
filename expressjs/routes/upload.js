const express = require('express')
const log4js = require('log4js')
const multer = require('multer')
const xlsx = require('node-xlsx')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../webapp/public/upload')
  },
  filename: (req, file, callback) => {
    callback(null, `schedule.${Date.now()}.${file.originalname}`)
  }
})
const upload = multer({ storage: storage })

router.post('/schedule', upload.single('file'), (req, res) => {
  logger.info(req.file)
  const sheets = xlsx.parse(req.file.path)
  for (let i = 0; i < sheets.length; i++) {
    for (let j = 0; j < sheets[i].data.length; j++) {
      if (j < 2) continue
      logger.info(sheets[i].data[j])
    }
  }
  res.json({ content: '', message: '' })
})

module.exports = router