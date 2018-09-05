const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

/**
 * 已读
 */
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

/**
 * 指定用户的未读通知
 */
router.get('/:user_id/', async (req, res) => {
  let sql = `
    select * from message where recieve_by_id = :user_id and status = '未读'
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

/**
 * 未读通知计数
 */
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

/**
 * 添加通知
 */
router.post('/', async (req, res) => {
  let sql = `
    insert into
      message
    set
      uuid = uuid(),
      send_by = :send_by,
      send_by_id = :send_by_id,
      send_time = now(),
      recieve_by = :recieve_by,
      recieve_by_id = :recieve_by_id,
      title = :title,
      content = :content
  `
  await sequelize.query(sql, {
    type: sequelize.QueryTypes.INSERT,
    replacements: req.body
  })
  .catch(err => {
    logger.error(err)
    res.json({ message: '服务器错误', content: '' })
  })
  res.json({ message: '', content: '' })
})

module.exports = router