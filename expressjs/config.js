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
  storage: {
    user: 'ovaphlow',
    password: 'ovaph@HD.1123',
    host: '192.168.0.109',
    database: 'haxi'
  },
}

module.exports = develConfig