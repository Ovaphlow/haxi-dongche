const log4js = require('log4js')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./config')

const logger = log4js.getLogger()
logger.level = config.app.logLevel

const app = new Koa()
app.use(bodyParser())

app.use(async (ctx, next) => {
  logger.info(ctx.request.method, ctx.request.path)
  next()
})

const test = require('./routes/test')
app.use(test.routes())

app.listen(config.app.port)