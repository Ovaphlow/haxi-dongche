const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    let sql = `
      update
        ledger08
      set
        date = :date,
        rail = :rail,
        location = :location,
        route = :route,
        time_begin = :time_begin,
        operator = :operator,
        dispatcher = :dispatcher,
        time_end = :time_end,
        operator_2 = :operator_2,
        dispatcher_2 = :dispatcher_2,
        remark = :remark
      where
        id = :id
    `
    req.body.id = req.params.id
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.UPDATE,
      replacements: req.body
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
    })
    res.status(200).json({ message: '', content: result })
  },

  get: async (req, res) => {
    let sql = `
      select * from ledger08 where id = :id limit 1
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      replacements: req.params
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
    })
    res.status(200).json({ message: '', content: result })
  },

  list: async (req, res) => {
    let sql = `
      select * from ledger08 order by id desc limit 200
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
    })
    res.status(200).json({ message: '', content: result })
  },

  save: async (req, res) => {
    console.info(2)
    let sql = `
      insert into
        ledger08 (
          uuid, date, rail, location, route,
          time_begin, operator, dispatcher,
          time_end, operator_2, dispatcher_2,
          remark
        )
        values (
          uuid(), :date, :rail, :location, :route,
          :time_begin, :operator, :dispatcher,
          :time_end, :operator_2, :dispatcher,
          :remark
        )
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.INSERT,
      replacements: req.body
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
    })
    res.status(200).json({ message: '', content: result })
  }
}