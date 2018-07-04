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
  const sheets = xlsx.parse(req.file.path)
  for (let i = 0; i < sheets.length; i++) {
    for (let j = 0; j < sheets[i].data.length; j++) {
      if (j < 2) continue
      logger.info(sheets[i].data[j])
      let sql = `
        select (max(counter) + 1) as max from source
      `
      sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(result => {
        counter = result[0].max || 1
        sql = `
          insert into
            source
          set
            uuid = uuid(),
            counter = :counter,
            upload_time = now(),
            file_name = :filename,
            p_xh = :p_xh,
            p_psj = :p_psj,
            p_yys = :p_yys,
            model = :model,
            train = :train,
            update_time = :update_time,
            total_mileage = :total_mileage,
            last_p_gjx = :last_p_gjx,
            last_date_p_gjx = :last_date_p_gjx,
            last_total_mileage_p_gjx = :last_total_mileage_gjx,
            mileage_after_last_p_gjx = :last_after_last_p_gjx,
        `
      })
    }
  }
  res.json({ content: '', message: '' })
})

module.exports = router