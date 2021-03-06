const fs = require('fs')

const log4js = require('log4js')
const xlsx = require('node-xlsx')

const config = require('../config')
const sequelize = require('../util/sequelize')
const sequelize_oa = require('../util/sequelize.oa')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

// 第二天白班
const SaveDocument02Schedule1 = async (i, sheets, counter) => {
  if (i === sheets[1].data.length - 1) return
  let sql = `
    insert into
      journal02_schedule (
        uuid, category, train, content, content_detail, date_begin, time_begin, date_end, time_end,
        p_yq_xdc, p_yq_jcw, p_yq_qt, dept, applicant, applicant_phone, counter
      )
      values (
        uuid(), :category, :train, :content, :content_detail, :date_begin, :time_begin, :date_end, :time_end,
        :p_yq_xdc, :p_yq_jcw, :p_yq_qt, :dept, :applicant, :applicant_phone, :counter
      )
  `
  let data = {
    category: '白班',
    train: sheets[1].data[i][1],
    content: sheets[1].data[i][2],
    content_detail: sheets[1].data[i][3],
    date_begin: sheets[1].data[i][4],
    time_begin: sheets[1].data[i][5],
    date_end: sheets[1].data[i][6],
    time_end: sheets[1].data[i][7],
    p_yq_xdc: sheets[1].data[i][8],
    p_yq_jcw: sheets[1].data[i][8],
    p_yq_qt: sheets[1].data[i][9],
    dept: sheets[1].data[i][10],
    applicant: sheets[1].data[i][11],
    applicant_phone: sheets[1].data[i][12],
    counter: counter
  }
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
    replacements: data
  })
  .catch(err => console.error(err))
  if (result[1] !== 1) console.error(`error on import data: ${sheets[0].data[i]}`)
  SaveDocument02Schedule1(i + 1, sheets, counter)
}

// 第一天夜班
const SaveDocument02Schedule = async (i, sheets, counter) => {
  if (i === sheets[0].data.length - 1) {
    SaveDocument02Schedule1(4, sheets, counter)
    return
  }
  let sql = `
    insert into
      journal02_schedule (
        uuid, category, train, content, content_detail, date_begin, time_begin, date_end, time_end,
        p_yq_xdc, p_yq_jcw, p_yq_qt, dept, applicant, applicant_phone, counter
      )
      values (
        uuid(), :category, :train, :content, :content_detail, :date_begin, :time_begin, :date_end, :time_end,
        :p_yq_xdc, :p_yq_jcw, :p_yq_qt, :dept, :applicant, :applicant_phone, :counter
      )
  `
  let data = {
    category: '夜班',
    train: sheets[0].data[i][1],
    content: sheets[0].data[i][2],
    content_detail: sheets[0].data[i][3],
    date_begin: sheets[0].data[i][4],
    time_begin: sheets[0].data[i][5],
    date_end: sheets[0].data[i][6],
    time_end: sheets[0].data[i][7],
    p_yq_xdc: sheets[0].data[i][8],
    p_yq_jcw: sheets[0].data[i][8],
    p_yq_qt: sheets[0].data[i][9],
    dept: sheets[0].data[i][10],
    applicant: sheets[0].data[i][11],
    applicant_phone: sheets[0].data[i][12],
    counter: counter
  }
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
    replacements: data
  })
  .catch(err => console.error(err))
  if (result[1] !== 1) console.error(`error on import data: ${sheets[0].data[i]}`)
  SaveDocument02Schedule(i + 1, sheets, counter)
}

module.exports = {
  UploadCarouselImage: async (req, res) => {
    let suffix = req.file.path.split('.').pop()
    let image = fs.readFileSync(req.file.path)
    // console.info(`data:image/${suffix};base64, ${image.toString('base64')}`)
    let sql = `
      insert into yitiji set img = :img
    `
    await sequelize_oa.query(sql, {
      type: sequelize.QueryTypes.INSERT,
      replacements: { img: `data:image/${suffix};base64, ${image.toString('base64')}` }
    })
    .catch(err => console.error(err))
    res.status(200).json({ message: '' })
  },

  Document02UploadSchedule: async (req, res) => {
    let sheets = xlsx.parse(req.file.path)
    let sql = `
      select (max(counter) + 1) as counter from journal02_schedule
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
    SaveDocument02Schedule(4, sheets, result[0].counter || 1)
    res.status(200).json({ message: '' })
  }
}

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, '../webapp/public/upload')
//   },
//   filename: (req, file, callback) => {
//     callback(null, `schedule.${Date.now()}.${file.originalname}`)
//   }
// })
// const upload = multer({ storage: storage })

/**
 * 上传列车走行里程表
 * 停用-----------------------
 */
// router.post('/schedule', upload.single('file'), (req, res) => {
//   logger.info(req.file)
//   const sheets = xlsx.parse(req.file.path)
//   for (let i = 0; i < sheets.length; i++) {
//     for (let j = 0; j < sheets[0].data.length; j++) {
//       if (j < 2) continue
//       // console.info(new Date(new Date(1900, 0, sheets[0].data[j][5] - 1).getTime()))
//       // console.info(sheets[0].data[j][5])
//       // continue
//       let sql = `
//         select (max(counter) + 1) as max from schedule_source
//       `
//       sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(result => {
//         counter = result[0].max || 1
//         sql = `
//           insert into
//             schedule_source
//           set
//             uuid = uuid(),
//             counter = :counter,
//             upload_time = now(),
//             file_name = :filename,
//             p_xh = :p_xh,
//             p_psj = :p_psj,
//             p_yys = :p_yys,
//             model = :model,
//             train = :train,
//             update_time = :update_time,
//             total_mileage = :total_mileage,
//             last_p_gjx = :last_p_gjx,
//             last_date_p_gjx = :last_date_p_gjx,
//             last_total_mileage_p_gjx = :last_total_mileage_gjx,
//             mileage_after_last_p_gjx = :mileage_after_last_p_gjx,
//             next_p_gjx = :next_p_gjx,
//             next_mileage_p_gjx = :next_mileage_p_gjx,
//             next_date = :next_date,
//             date_p_sx = :date_p_sx
//         `
//         sequelize.query(sql, {
//           replacements: {
//             counter: counter,
//             filename: req.file.filename,
//             p_xh: sheets[0].data[j][0],
//             p_psj: sheets[0].data[j][1],
//             p_yys: sheets[0].data[j][2],
//             model: sheets[0].data[j][3],
//             train: sheets[0].data[j][4],
//             // update_time: new Date(new Date(1900, 0, sheets[0].data[j][5] - 1).getTime()),
//             update_time: sheets[0].data[j][5],
//             total_mileage: sheets[0].data[j][6],
//             last_p_gjx: sheets[0].data[j][7],
//             // last_date_p_gjx: new Date(1900, 0, sheets[0].data[j][8] - 1).toLocaleDateString(),
//             last_date_p_gjx: sheets[0].data[j][8],
//             last_total_mileage_gjx: sheets[0].data[j][9],
//             mileage_after_last_p_gjx: sheets[0].data[j][10],
//             next_p_gjx: sheets[0].data[j][11],
//             next_mileage_p_gjx: sheets[0].data[j][12],
//             // next_date: new Date(1900, 0, sheets[0].data[j][13] - 1).toLocaleDateString(),
//             next_date: sheets[0].data[j][13],
//             // date_p_sx: new Date(1900, 0, sheets[0].data[j][14] - 1).toLocaleDateString()
//             date_p_sx: sheets[0].data[j][14]
//           },
//           type: sequelize.QueryTypes.INSERT
//         }).then(result => {
//         }).catch(err => {
//           logger.error(err)
//         })
//       })
//     }
//   }
//   res.json({ content: '', message: '' })
// })

// module.exports = router