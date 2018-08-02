const prodConfig = {
  app: {
    env: 'production',
    logLevel: 'info',
    port: 8081,
    secretKey: 'ovaphlow',
    webappPath: `${__dirname}/../webapp`,
    webappFilePath: `/public/assets/file`
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  cache: {
    expire: 604800
  },
  storage: {
    user: 'root',
    password: 'root',
    host: '127.0.0.1',
    database: 'haxi'
  },
}

const develConfig = {
  app: {
    env: 'development',
    logLevel: 'debug',
    port: 8081,
    secretKey: 'ovaphlow',
    webappPath: `${__dirname}/../webapp`,
    webappFilePath: `/public/assets/file`
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  cache: {
    expire: 604800
  },
  storage: {
    user: 'wangxn',
    password: 'wang@HD.1123',
    host: '127.0.0.1',
    database: 'haxi'
  },
}

module.exports = develConfig