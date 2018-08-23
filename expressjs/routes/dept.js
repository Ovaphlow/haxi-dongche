const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.delete('/:id', async (req, res) => {
  let sql = `
    delete from common_data where id = :id
  `
  let result = sequelize.query(sql, {
    type: sequelize.QueryTypes.DELETE,
    replacements: { id: req.params.id }
  })
  logger.info(result)
  res.json({ content: '', message: '' })
})

router.route('/:id').put((req, res) => {
  let sql = `
    update common_data set value = :name where id = :id
  `
  sequelize.query(sql, {
    replacements: { name: req.body.name, id: parseInt(req.params.id) },
    type: sequelize.QueryTypes.UPDATE
  }).then(result => {
    if (result[1] === 1) {
      res.json({ content: '', message: '' })
    } else {
      res.json({ content: '', message: '数据异常。' })
    }
  }).catch(err => {
    res.json({ content: '', message: '服务器错误' })
  })
})

router.route('/:id').get((req, res) => {
  let sql = `
    select id, uuid, value as name, remark as category from common_data where id = :id and category = '部门'
  `
  sequelize.query(sql, {
    replacements: { id: parseInt(req.params.id) },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    if (result.length === 1) {
      res.json({ content: result[0], message: '' })
    } else {
      res.json({ content: '', message: '数据异常。' })
    }
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
})

router.route('/').post((req, res) => {
  let sql = `
    insert into common_data set uuid = uuid(), value = :name, category = '部门'
  `
  sequelize.query(sql, {
    replacements: { name: req.body.name },
    type: sequelize.QueryTypes.INSERT
  }).then(result => {
    if (result[1] === 1) {
      res.json({ content: '', message: '' })
    } else {
      res.json({ content: '', message: '操作异常。' })
    }
  }).catch(error => {
    res.json({ content: '', message: '服务器错误' })
  })
})

router.route('/').get((req, res) => {
  let sql = `
    select
      id, uuid, value as name, remark as category,
      (select count(*) from user where dept_id = cd.id) as qty
    from
      common_data as cd
    where
      category = '部门'
  `
  sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(error => {
    logger.error(error)
    res.json({ content: '', message: '', status: 500 })
  })

})

module.exports = router
