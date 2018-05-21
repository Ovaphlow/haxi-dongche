const Router = require('koa-router')

let router = new Router({
  prefix: '/api'
})

router.get('/test', async (ctx, next) => {
  ctx.body = { content: '', message: 200 }
})

module.exports = router