const sequelize = require('../util/sequelize')

module.exports = {
  review: async (req, res) => {
    console.info(req.body)
    let sql = `
      update
        ledger11
      set
        p_dbsz = :p_dbsz
      where
        id = :id
    `
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

  list_review: async (req, res) => {
    let sql = `
      select
        *
      from
        ledger11
      where
        p_dbsz = ''
      limit 200
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

  update: async (req, res) => {
    let sql = `
      update
        ledger11
      set
        train = :train,
        carriage = :carriage,
        parts = :parts,
        content = :content,
        date = :date,
        dept = :dept,
        operator = :operator,
        p_dbsz = :p_dbsz,
        date_2 = :date_2,
        dept_2 = :dept_2,
        operator_2 = :operator_2,
        remark = :remark
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
      select * from ledger11 where id = :id limit 1
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
      select * from ledger11 order by id desc limit 200
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
        ledger11 (
          uuid, train, carriage, parts, content,
          date, dept, operator, p_dbsz,
          date_2, dept_2, operator_2, remark
        )
        values (
          uuid(), :train, :carriage, :parts, :content,
          :date, :dept, :operator, :p_dbsz,
          :date_2, :dept_2, :operator_2, :remark
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