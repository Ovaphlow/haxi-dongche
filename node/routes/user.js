const crypto = require('crypto')

const axios = require('axios')
const express = require('express')
const jwt = require('jsonwebtoken')
const log4js = require('log4js')

const config = require('../config')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

router.route('/login').post((req, res) => {
  let hash = crypto.createHash('md5')
  let password = hash.update(req.body.password, 'utf8').digest('hex')
  axios({
    method: req.method,
    url: `${config.proxy.url}/api/user/login`,
    data: {
      account: req.body.account,
      password: password
    },
    responseType: 'json'
  }).then((response) => {
    res.json(response.data)
  })
})

module.exports = router