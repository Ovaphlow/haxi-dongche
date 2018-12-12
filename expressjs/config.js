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
    port: 3306,
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
    user: 'ovaphlow',
    password: 'dsdfjk',
    host: '192.168.1.248',
    port: 3306,
    database: 'haxi',
    logging: false
  },
  mysql_oa: {
    user: 'root1',
    password: 'root',
    host: '192.168.1.145',
    database: 'train',
    logging: false
  }
}

module.exports = develConfig
