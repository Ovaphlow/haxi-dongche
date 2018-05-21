const Router = require('koa-router')

let router = new Router()

router.get('/api/test', (ctx, next) => {
  ctx.body = { content: '', message: 200 }
})

module.exports = router