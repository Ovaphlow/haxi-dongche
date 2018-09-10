const fs = require('fs')

const express = require('express')
const log4js = require('log4js')
const xlsx = require('node-xlsx')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

// 导出查询结果到Excel
router.post('/journal02/export/filter', async (req, res) => {
  let sql = `
    select
      *
    from
      journal02
    where
      position(:dept in dept) = 1
      and position(:train in group_sn) = 1
      and date_begin between :date_begin and :date_end
      and time_begin between :time_begin and :time_end
      and reject = ''
      and sign_verify is not null
      and sign_verify != ''
    order by date_begin, time_begin, id
    limit 1000
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.body
  })
  .catch(err => {
    logger.error(err)
    res.json({ message: '服务器错误', content: '' })
    return false
  })
  let data = []
  let header = ['申请单位', '申请人', '作业车组号', '申请作业时间', '作业内容', '作业完成情况', '作业完成时间']
  data.push(header)
  result.forEach((item) => {
    let row = []
    row.push(item.dept, item.applicant, item.group_sn, `${item.date_begin} ${item.time_begin}`,
        `${item.content_detail}`,
        item.verify_report, `${item.verify_leader_date} ${item.verify_leader_time}`)
    data.push(row)
  })
  let buffer = xlsx.build([{ name: '一体化作业申请单数据导出', data: data }])
  fs.writeFileSync(`../webapp/download/${req.body.user_uuid}.xlsx`, buffer, 'binary')
  res.json({ message: '', content: `./download/${req.body.user_uuid}.xlsx` })
})

router.route('/journal02/:uuid').get((req, res) => {
  // let sql = `
  //   select * from journal02 where uuid = :uuid
  // `
  // sequelize.query(sql, {
  //   replacements: { uuid: req.params.uuid },
  //   type: sequelize.QueryTypes.SELECT
  // }).then(result => {
  //   if (result.length !== 1) {
  //     res.json({ content: '', message: '未检索到相关数据。' })
  //     return false
  //   }
  //   let path = `${config.app.webappPath}/${config.app.webappFilePath}/template1.xlsx`
  //   // const buffer = xlsx.parse(fs.readFileSync(path))[0].data
  //   const buffer = xlsx.parse(path)[0].data

  //   // 申请单位
  //   logger.info(buffer[10])

  //   let output = xlsx.build([{ name: `预览`, data: buffer }])
  //   let filename = `${result[0].uuid}.xlsx`
  //   fs.writeFileSync(`e:/${filename}`, output)

  //   res.json({ content: result, message: '' })
  // }).catch(err => {
  //   logger.error(err)
  //   res.json({ content: '', message: '服务器错误。' })
  // })
})

module.exports = router
