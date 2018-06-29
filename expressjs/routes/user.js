const crypto = require('crypto')

const express = require('express')
const jwt = require('jsonwebtoken')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.route('/:id').delete((req, res) => {
  let sql = `delete from user where id = :id`
  sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: sequelize.QueryTypes.DELETE
  }).then(result => {
   res.json({ content: '', message: '数据已提交至服务器，请稍后检查操作结果。', status: 200 })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/').post((req, res) => {
  let sql = `
    insert into
      user
    set
      uuid = uuid(),
      dept_id = :dept_id,
      username = :username,
      password = :password,
      name = :name,
      phone = :phone,
      auth_admin = :auth_admin,
      auth_01 = :auth_01,
      auth_p_jsy = :auth_p_jsy,
      auth_p_zbsz = :auth_p_zbsz,
      auth_p_dd = :auth_p_dd
  `
  sequelize.query(sql, {
    replacements: {
      dept_id: req.body.dept_id,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone || '',
      auth_admin: req.body.auth_admin,
      auth_01: req.body.auth_01,
      auth_p_jsy: req.body.auth_p_jsy,
      auth_p_zbsz: req.body.auth_p_zbsz,
      auth_p_dd: req.body.auth_p_dd
    },
    type: sequelize.QueryTypes.INSERT
  }).then(result => {
    res.json({ content: '', message: '数据已提交至服务器，请稍后检查操作结果。', status: 200 })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/:id').put((req, res) => {
  let sql = `
    update
      user
    set
      dept_id = :dept_id,
      username = :username,
      name = :name,
      phone = :phone,
      auth_admin = :auth_admin,
      auth_01 = :auth_01,
      auth_p_jsy = :auth_p_jsy,
      auth_p_zbsz = :auth_p_zbsz,
      auth_p_dd = :auth_p_dd
    where
      id = :id
  `
  sequelize.query(sql, {
    replacements: {
      dept_id: req.body.dept_id,
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      auth_admin: req.body.auth_admin,
      auth_01: req.body.auth_01,
      auth_p_jsy: req.body.auth_p_jsy,
      auth_p_zbsz: req.body.auth_p_zbsz,
      auth_p_dd: req.body.auth_p_dd,
      id: req.params.id
    },
    type: sequelize.QueryTypes.UPDATE
  }).then(result => {
    res.json({ content: '', message: '数据已提交至服务器，请稍后检查操作结果。', status: 200 })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/:id').get((req, res) => {
  let sql = `
    select u.* from user as u where id = :id
  `
  sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    if (result) {
      res.json({ content: result[0], message: '', status: 200 })
    } else {
      res.json({ content: '', message: '未检索到指定用户。', status: 204 })
    }
  }).catch(err => {
    res.json({ content: '', message: '检索数据失败。', status: 500 })
  })
})

router.route('/').get((req, res) => {
  let sql = `
    select
      id, uuid, username, name, phone, auth_admin, auth_01, auth_p_jsy, auth_p_zbsz, auth_p_dd,
      (select name from dept where id = u.dept_id) as dept
    from
      user as u
    order by
      id desc
  `
  sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '', status: 500 })
  })
})

router.route('/dept/:id').get((req, res) => {
  let sql = `
    select
      id, uuid, name, phone
    from
      user
    where
      dept_id = :id
  `
  sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(error => {
    logger.error(error)
    res.json({ content: '', message: '检索数据失败。', status: 500 })
  })
})

router.route('/login').post((req, res) => {
  let sql = `
    select
      u.id, u.uuid, username, u.name, d.name as dept, d.id as dept_id, u.phone,
      auth_admin, auth_01, auth_p_jsy, auth_p_zbsz, auth_p_dd
    from
      user as u
      left join dept as d
        on d.id = u.dept_id
    where
      username = :account
      and password = :password
  `
  sequelize.query(sql, {
    replacements: { account: req.body.account, password: req.body.password },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(error => {
    logger.error(error)
    res.json({ content: '', message: '检索数据失败。', status: 500 })
  })
})

module.exports = router