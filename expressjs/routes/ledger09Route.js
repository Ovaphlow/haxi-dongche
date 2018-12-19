const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    let sql = `
      update
        ledger09
      set
        date = :date,
        dept = :dept,
        content = :content,
        applicant = applicant,
        time = :time,
        rail = :rail,
        location = :location,
        operator = :operator,
        observer = :observer,
        status = :status
      where
        id = :id
    `
    req.body.id = req.params.id
    let result = sequelize.query(sql, {
      type: sequelize.QueryTypes.UPDATE,
      replacements: req.body
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
      return
    })
    res.status(200).json({ message: '', content: result })
  },

  get: async (req, res) => {
    let sql = `
      select * from ledger09 where id = :id limit 1
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      replacements: req.params
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
      return
    })
    res.status(200).json({ message: '', content: result.length === 1 ? result[0] : {} })
  },

  list: async (req, res) => {
    let sql = `
      select * from ledger09 order by id desc limit 200
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
      return
    })
    res.status(200).json({ message: '', content: result })
  },

  save: async (req, res) => {
    let sql = `
      insert into
        ledger09 (
          uuid, date, dept, content, applicant, time, rail, location, operator, observer, status
        )
        values (
          uuid(), :date, :dept, :content, :applicant, :time,
          :rail, :location, :operator, :observer, :status
        )
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
      replacements: req.body
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
      return
    })
    res.json(200).json({ message: '', content: result })
  }
}