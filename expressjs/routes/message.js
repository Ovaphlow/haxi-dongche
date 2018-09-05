const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.put('/:id/read', async (req, res) => {
  let sql = `
    update message set recieve_time = now(), status = '已读' where id = :id
  `
  sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: req.params
  })
  .catch(err => {
    logger.error(err)
    res.json({ message: '服务器错误' })
  })
  res.json({ message: '', content: '' })
})

router.get('/:id/', async (req, res) => {
  let sql = `
    select * from message where recieve_by_id = :id and status = '未读'
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  })
  .catch(err => {
    logger.error(err)
    res.json({ message: '服务器错误', content: '' })
  })
  res.json({ message: '', content: result })
})

router.get('/:id/unread/qty', async (req, res) => {
  let sql = `
    select count(*) as qty from message where recieve_by_id = :id and status = '未读'
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  })
  .catch(err => {
    logger.error(err)
    res.json({ message: '服务器错误', content: '' })
  })
  res.json({ message: '', content: result[0] })
})

module.exports = router