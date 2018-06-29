const fs = require('fs')

const express = require('express')
const log4js = require('log4js')
const xlsx = require('node-xlsx')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.route('/journal02/:uuid').get((req, res) => {
  let sql = `
    select * from journal02 where uuid = :uuid
  `
  sequelize.query(sql, {
    replacements: { uuid: req.params.uuid },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    if (result.length !== 1) {
      res.json({ content: '', message: '未检索到相关数据。' })
      return false
    }
    let path = `${config.app.webappPath}/${config.app.webappFilePath}/template1.xlsx`
    // const buffer = xlsx.parse(fs.readFileSync(path))[0].data
    const buffer = xlsx.parse(path)[0].data

    // 申请单位
    logger.info(buffer[10])

    let output = xlsx.build([{ name: `预览`, data: buffer }])
    let filename = `${result[0].uuid}.xlsx`
    fs.writeFileSync(`e:/${filename}`, output)

    res.json({ content: result, message: '' })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误。' })
  })
})

module.exports = router