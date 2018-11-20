const os = require('os')

const Sequelize = require('sequelize')

const config = require('../config')

const sequelize = new Sequelize(config.storage.database, config.storage.user, config.storage.password, {
  dialect: 'mysql',

  host: config.storage.host,

  port: 3306,

  pool: {
    max: os.cpus().length * 2,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },

  logging: config.storage.logging
})

module.exports = sequelize
