const sequelize = require('../util/sequelize')

module.exports = {
  login: async (req, res) => {
    let sql = `
      select
        u.id, u.uuid, username, u.name, d.value as dept, d.id as dept_id, u.phone, u.dept_leader,
        auth_admin, auth_01, auth_p_jsy, auth_p_zbsz, auth_p_dd, sign
      from
        user as u
        left join common_data as d
          on d.id = u.dept_id
      where
        username = :account
        and password = :password
    `
    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { account: req.body.account, password: req.body.password }
    }).catch(err => {
      console.error(err)
      res.status(500).json({ content: '', message: '检索数据失败' })
    })
    res.status(200).json({ content: result, message: '' })
  }
}