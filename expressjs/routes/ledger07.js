const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    let sql = `
      update
        ledger07
      set
        date = :date,
        train = :train,
        rail = :rail,
        operator = :operator,
        leader = :leader,
        qc = :qc,
        date_2 = :date_2,
        train_2 = :train_2,
        rail_2 = :rail_2,
        operator_2 = :operator_2,
        leader_2 = :leader_2,
        qc_2 = :qc_2
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
      res.status(500).json({ message: '服务器错误'} )
      return
    })
    res.status(200).json({ message: '', content: result })
  },

  get: async (req, res) => {
    console.info(req.params)
    let sql = `
      select * from ledger07 where id = :id limit 1
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
    res.status(200).json({
      message: '',
      content: result.length > 0 ? result[0] : {}
    })
  },

  list: async (req, res) => {
    let sql = `
      select * from ledger07 order by id desc limit 200
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
        ledger07 (
          uuid,
          date, train, rail, operator, leader, qc,
          date_2, train_2, rail_2, operator_2, leader_2, qc_2
        )
        values (
          uuid(),
          :date, :train, :rail, :operator, :leader, :qc,
          :date_2, :train_2, :rail_2, :operator_2, :leader_2, qc_2
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
    res.status(200).json({ message: '', content: result })
  }
}