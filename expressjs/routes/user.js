const crypto = require('crypto')

const axios = require('axios')
const express = require('express')
const jwt = require('jsonwebtoken')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

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