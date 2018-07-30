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
      // console.info(new Date(new Date(1900, 0, sheets[i].data[j][5] - 1).getTime()))
      // console.info(sheets[i].data[j][5])
      // continue
      let sql = `
        select (max(counter) + 1) as max from schedule_source
      `
      sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(result => {
        counter = result[0].max || 1
        sql = `
          insert into
            schedule_source
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
            mileage_after_last_p_gjx = :mileage_after_last_p_gjx,
            next_p_gjx = :next_p_gjx,
            next_mileage_p_gjx = :next_mileage_p_gjx,
            next_date = :next_date,
            date_p_sx = :date_p_sx
        `
        sequelize.query(sql, {
          replacements: {
            counter: counter,
            filename: req.file.filename,
            p_xh: sheets[i].data[j][0],
            p_psj: sheets[i].data[j][1],
            p_yys: sheets[i].data[j][2],
            model: sheets[i].data[j][3],
            train: sheets[i].data[j][4],
            // update_time: new Date(new Date(1900, 0, sheets[i].data[j][5] - 1).getTime()),
            update_time: sheets[i].data[j][5],
            total_mileage: sheets[i].data[j][6],
            last_p_gjx: sheets[i].data[j][7],
            // last_date_p_gjx: new Date(1900, 0, sheets[i].data[j][8] - 1).toLocaleDateString(),
            last_date_p_gjx: sheets[i].data[j][8],
            last_total_mileage_gjx: sheets[i].data[j][9],
            mileage_after_last_p_gjx: sheets[i].data[j][10],
            next_p_gjx: sheets[i].data[j][11],
            next_mileage_p_gjx: sheets[i].data[j][12],
            // next_date: new Date(1900, 0, sheets[i].data[j][13] - 1).toLocaleDateString(),
            next_date: sheets[i].data[j][13],
            // date_p_sx: new Date(1900, 0, sheets[i].data[j][14] - 1).toLocaleDateString()
            date_p_sx: sheets[i].data[j][14]
          },
          type: sequelize.QueryTypes.INSERT
        }).then(result => {
        }).catch(err => {
          logger.error(err)
        })
      })
    }
  }
  res.json({ content: '', message: '' })
})

module.exports = router