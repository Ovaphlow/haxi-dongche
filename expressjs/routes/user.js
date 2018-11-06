const express = require('express')
const log4js = require('log4js')

const config = require('../config')
const sequelize = require('../util/sequelize')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const router = express.Router()

// 指定用户所属部门信息
router.get('/:id/dept', async (req, res) => {
  let sql = `
    select
      *
    from
      common_data
    where
      id = (select dept_id from user where id = :id limit 1)
    limit 1
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  })
  .catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  logger.info(result)
  if (result.length !== 1) {
    res.json({ content: '', message: '无有效数据' })
    return
  }
  res.json({ content: result[0], message: '' })
})

// 指定部门用户列表
router.get('/dept/name/:name', async (req, res) => {
  let sql = `
    select
      u.id, name, phone
    from
      user as u
    join
      common_data as cd on cd.id = u.dept_id
    where
      cd.value = :name
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  res.json({ content: result, message: '' })
})

// 指定部门用户列表
router.get('/dept/:dept_id', async (req, res) => {
  let sql = `
    select id, name, phone from user where dept_id = :dept_id
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  res.json({ content: result, message: '' })
})

// 设置签名
router.put('/:id/sign', async (req, res) => {
  let sql = `
    update user set sign = :sign where id = :id
  `
  req.body.id = req.params.id
  await sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: req.body
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  res.json({ content: '', message: '' })
})

// 修改密码
router.put('/:id/password', async (req, res) => {
  let sql = `
    update user set password = :password where id = :id
  `
  req.body.id = req.params.id
  await sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: req.body
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  res.json({ content: '', message: '' })
})

// 编辑用户信息
// router.put('/:id', async (req, res) => {
//   let sql = `
//     update user set username = :account, name = :name, phone = :phone where id = :id
//   `
//   req.body.id = req.params.id
//   let result = await sequelize.query(sql, {
//     type: sequelize.QueryTypes.UPDATE,
//     replacements: req.body
//   }).catch(err => {
//     logger.error(err)
//     res.json({ content: '', message: '服务器错误' })
//   })
//   logger.info(result)
//   res.json({ content: '', message: '' })
// })

/**
 * 删除用户
 */
router.route('/:id').delete((req, res) => {
  let sql = `delete from user where id = :id`
  sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: sequelize.QueryTypes.DELETE
  }).then(result => {
   res.json({ content: '', message: '' })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

router.route('/').post((req, res) => {
  let sql = `
    insert into
      user
    set
      uuid = uuid(),
      dept_id = :dept_id,
      username = :username,
      password = :password,
      name = :name,
      phone = :phone,
      auth_admin = :auth_admin,
      auth_01 = :auth_01,
      auth_p_jsy = :auth_p_jsy,
      auth_p_zbsz = :auth_p_zbsz,
      auth_p_dd = :auth_p_dd
  `
  sequelize.query(sql, {
    replacements: {
      dept_id: req.body.dept_id,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone || '',
      auth_admin: req.body.auth_admin,
      auth_01: req.body.auth_01,
      auth_p_jsy: req.body.auth_p_jsy,
      auth_p_zbsz: req.body.auth_p_zbsz,
      auth_p_dd: req.body.auth_p_dd
    },
    type: sequelize.QueryTypes.INSERT
  }).then(result => {
    res.json({ content: '', message: '' })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '提交数据失败。', status: 500 })
  })
})

// 修改用户信息
router.put('/:id', async (req, res) => {
  let sql = `
    update
      user
    set
      dept_id = :dept_id,
      username = :account,
      name = :name,
      phone = :phone,
      dept_leader = :dept_leader,
      auth_admin = :auth_admin,
      auth_01 = :auth_01,
      auth_p_jsy = :auth_p_jsy,
      auth_p_zbsz = :auth_p_zbsz,
      auth_p_dd = :auth_p_dd
    where
      id = :id
  `
  req.body.id = req.params.id
  await sequelize.query(sql, {
    type: sequelize.QueryTypes.UPDATE,
    replacements: req.body
  })
  .catch(err => {
    logger.error(err)
    res.json({ content: '', message: '服务器错误' })
  })
  res.json({ content: '', message: '' })
})

router.get('/:id', async (req, res) => {
  let sql = `
    select
      u.*,
      (select value from common_data where id = u.dept_id) as dept
    from
      user as u
    where
      id = :id
  `
  let result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
    replacements: req.params
  })
  .catch(err => {
    console.error(err)
    res.json({ content: '', message: '检索数据失败。' })
  })
  if (result) {
    res.json({ content: result[0], message: '' })
  } else {
    res.json({ content: '', message: '未检索到指定用户。' })
  }
})

router.route('/').get((req, res) => {
  let sql = `
    select
      id, uuid, username, name, phone, auth_admin, auth_01, auth_p_jsy, auth_p_zbsz, auth_p_dd,
      (select value from common_data where id = u.dept_id) as dept
    from
      user as u
    order by
      id desc
  `
  sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(err => {
    logger.error(err)
    res.json({ content: '', message: '', status: 500 })
  })
})

router.route('/dept/:id').get((req, res) => {
  let sql = `
    select
      id, uuid, name, phone
    from
      user
    where
      dept_id = :id
  `
  sequelize.query(sql, {
    replacements: { id: req.params.id },
    type: sequelize.QueryTypes.SELECT
  }).then(result => {
    res.json({ content: result, message: '', status: 200 })
  }).catch(error => {
    logger.error(error)
    res.json({ content: '', message: '检索数据失败。', status: 500 })
  })
})

// 登录
// router.route('/login').post((req, res) => {
//   let sql = `
//     select
//       u.id, u.uuid, username, u.name, d.value as dept, d.id as dept_id, u.phone, u.dept_leader,
//       auth_admin, auth_01, auth_p_jsy, auth_p_zbsz, auth_p_dd, sign
//     from
//       user as u
//       left join common_data as d
//         on d.id = u.dept_id
//     where
//       username = :account
//       and password = :password
//   `
//   sequelize.query(sql, {
//     replacements: { account: req.body.account, password: req.body.password },
//     type: sequelize.QueryTypes.SELECT
//   }).then(result => {
//     res.json({ content: result, message: '', status: 200 })
//   }).catch(error => {
//     logger.error(error)
//     res.json({ content: '', message: '检索数据失败。', status: 500 })
//   })
// })

module.exports = router
