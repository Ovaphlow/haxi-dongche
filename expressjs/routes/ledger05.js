const config = require('../config')
const sequelize = require('../util/sequelize')

module.exports = {
  update: async (req, res) => {
    res.status(200).json({ message: '' })
  },

  get: async (req, res) => {
    let sql = `
      select * from ledger05 where id = :id
    `
    let result = await sequelize(sql, {
      type: sequelize.QueryTypes.SELECT,
      replacements: req.params
    })
    .catch(err => res.status(500).json({ message: '服务器错误' }))
    if (result.length !== 1) {
      res.status(200).json({ message: '' })
      return
    }
    res.status(200).json({ message: '', content: result[0] })
  },

  list: async (req, res) => {
    let sql = `
      select
        *
      from
        ledger05
      limit 200
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
    .catch(err => {
      res.status(500).json({ message: '服务求错误' })
    })
    res.status(200).json({ message: '', content: result })
  },

  save: async (req, res) => {
    console.info(req.body)
    let sql = `
      insert into
        ledger05 (
          uuid, date,
          stuff_succession_1_1_1, time_succession_1_1_1, stuff_shift_1_1_1, time_shift_1_1_1, remark_1_1_1,
          stuff_succession_1_1_2, time_succession_1_1_2, stuff_shift_1_1_2, time_shift_1_1_2, remark_1_1_2,
          stuff_succession_1_2_1, time_succession_1_2_1, stuff_shift_1_2_1, time_shift_1_2_1, remark_1_2_1,
          stuff_succession_1_2_2, time_succession_1_2_2, stuff_shift_1_2_2, time_shift_1_2_2, remark_1_2_2,
          stuff_succession_2_1_1, time_succession_2_1_1, stuff_shift_2_1_1, time_shift_2_1_1, remark_2_1_1,
          stuff_succession_2_1_2, time_succession_2_1_2, stuff_shift_2_1_2, time_shift_2_1_2, remark_2_1_2,
          stuff_succession_2_2_1, time_succession_2_2_1, stuff_shift_2_2_1, time_shift_2_2_1, remark_2_2_1,
          stuff_succession_2_2_2, time_succession_2_2_2, stuff_shift_2_2_2, time_shift_2_2_2, remark_2_2_2
        )
        values (
          uuid(), :date,
          :stuff_succession_1_1_1, :time_succession_1_1_1, :stuff_shift_1_1_1, :time_shift_1_1_1, :remark_1_1_1,
          :stuff_succession_1_1_2, :time_succession_1_1_2, :stuff_shift_1_1_2, :time_shift_1_1_2, :remark_1_1_2,
          :stuff_succession_1_2_1, :time_succession_1_2_1, :stuff_shift_1_2_1, :time_shift_1_2_1, :remark_1_2_1,
          :stuff_succession_1_2_2, :time_succession_1_2_2, :stuff_shift_1_2_2, :time_shift_1_2_2, :remark_1_2_2,
          :stuff_succession_2_1_1, :time_succession_2_1_1, :stuff_shift_2_1_1, :time_shift_2_1_1, :remark_2_1_1,
          :stuff_succession_2_1_2, :time_succession_2_1_2, :stuff_shift_2_1_2, :time_shift_2_1_2, :remark_2_1_2,
          :stuff_succession_2_2_1, :time_succession_2_2_1, :stuff_shift_2_2_1, :time_shift_2_2_1, :remark_2_2_1,
          :stuff_succession_2_2_2, :time_succession_2_2_2, :stuff_shift_2_2_2, :time_shift_2_2_2, :remark_2_2_2
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
    if (result[1] !== 1) {
      res.status(200).json({ message: '保存数据失败' })
      return
    }
    res.status(200).json({ message: '', content: result[0] })
  }
}