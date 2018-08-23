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
    database: 'haxi',
    logging: false
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
    user: 'root',
    password: '',
    host: '127.0.0.1',
    database: 'haxi',
    logging: true
  },
}

module.exports = develConfig
