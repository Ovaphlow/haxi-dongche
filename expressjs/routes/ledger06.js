const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    let sql = `
      update
        ledger06
      set
        date = :date,
        workshop = :workshop,
        operator = :operator,
        place = :place,
        content = :content,
        time_begin = :time_begin,
        time_end = :time_end,
        observer = :observer,
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
      return
    })
    res.status(200).json({ message: '', content: result })
  },

  get: async (req, res) => {
    let sql = `
      select * from ledger06 where id = :id limit 1
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      replacements: req.params
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: '服务器错误' })
    })
    if (result.length !== 1) {
      res.status(200).json({ message: '数据异常' })
    }
    res.status(200).json({ message: '', content: result[0] })
  },

  list: async (req, res) => {
    let sql = `
      select * from ledger06 order by id desc limit 200
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
        ledger06 (
          uuid,
          date, workshop, operator, place, content,
          time_begin, time_end, observer, remark
        )
        values (
          uuid(),
          :date, :workshop, :operator, :place, :content,
          :time_begin, :time_end, :observer, :remark
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
    res.json({ message: '', content: result })
  }
}