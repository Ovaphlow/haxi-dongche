const os = require('os')

const Sequelize = require('sequelize')

const config = require('../config')

const sequelize = new Sequelize(config.mysql_oa.database, config.mysql_oa.user, config.mysql_oa.password, {
  dialect: 'mysql',

  host: config.mysql_oa.host,

  port: 3306,

  pool: {
    max: os.cpus().length * 2,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },

  logging: config.mysql_oa.logging
})

module.exports = sequelize

