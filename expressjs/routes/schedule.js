const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

module.exports = router

/**
 * 停用------------------------
 */
router.get('/train/:train/model', (req, res) => {
  let sql = `
    select model from schedule_source where train = :train order by id desc limit 1
  `
  sequelize.query(sql, {
    replacements: { train: req.params.train },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '' })
  }).catch(response => {
    res.json({ content: '', message: '服务器错误' })
  })
})