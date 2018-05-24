const os = require('os')

const Sequelize = require('sequelize')

const config = require('../config')

const sequelize = new Sequelize(config.storage.database, config.storage.user, config.storage.password, {
  dialect: 'mysql',

  host: config.storage.host,

  port: 3306,

  pool: {
    max: os.cpus().length * 2 + 1,
    idle: os.cpus().length * 2 + 1,
    acquire: 60000,
  },
})

module.exports = sequelize