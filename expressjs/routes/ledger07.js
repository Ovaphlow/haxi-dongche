const sequelize = require('../util/sequelize')

module.exports = {
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
    })
    res.status(200).json({ message: '', content: result })
  }
}