const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.route('/:id').put((req, res) => {
  let sql = `
    update dept set name = :name where id = :id
  `
  sequelize.query(sql, {
    replacements: { name: req.body.name, id: parseInt(req.params.id) },
    type: sequelize.QueryTypes.UPDATE
  }).then(result => {
    if (result[1] === 1) {
      res.json({ content: '', message: '', status: 200 })
    } else {
      res.json({ content: '', message: '数据异常。', status: 400 })
    }
  }).catch(err => {
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/:id').get((req, res) => {
  let sql = `
    select * from dept where id = :id
  `
  sequelize.query(sql, {
    replacements: { id: parseInt(req.params.id) },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    if (result.length === 1) {
      res.json({ content: result[0], message: '', status: 200 })
    } else {
      res.json({ content: '', message: '数据异常。', status: 400 })
    }
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '检索数据失败。', status: 500 })
  })
})

router.route('/').post((req, res) => {
  let sql = `
    insert into dept set uuid = uuid(), name = :name
  `
  sequelize.query(sql, {
    replacements: { name: req.body.name },
    type: sequelize.QueryTypes.INSERT
  }).then(result => {
    if (result[1] === 1) {
      res.json({ content: '', message: '', status: 200 })
    } else {
      res.json({ content: '', message: '操作异常。', status: 202 })
    }
  }).catch(error => {
    logger.error(error)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/').get((req, res) => {
  let sql = `
    select * from dept
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