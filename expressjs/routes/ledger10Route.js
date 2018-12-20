const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    let sql = `
      update
        ledger10
      set
        date = :date,
        time_begin = :time_begin,
        time_end = :time_end,
        train = :train,
        carriage = :carriage,
        content = :content,
        p_yq_jcw = :p_yq_jcw,
        p_yq_xdc = :p_yq_xdc,
        p_yq_zydd = :p_yq_zydd,
        p_yq_move = :p_yq_move,
        report = :report,
        dept = :dept,
        applicant = :applicant,
        phone = :phone,
        review_time = :review_time,
        review_by = :review_by
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
      select * from ledger10 where id = :id limit 1
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
      select * from ledger10 order by id desc limit 200
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
        ledger10 (
          uuid,
          date, time_begin, time_end, train, carriage, content,
          p_yq_jcw, p_yq_xdc, p_yq_zydd, p_yq_move,
          dept, applicant, phone,
          review_time, review_by
        )
        values (
          uuid(),
          :date, :time_begin, :time_end, :train, :carriage, :content,
          :p_yq_jcw, :p_yq_xdc, p_yq_zydd, :p_yq_move,
          :dept, :applicant, :phone,
          :review_time, :review_by
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