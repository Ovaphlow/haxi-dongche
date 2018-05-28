const prodConfig = {
  app: {
    env: 'development',
    logLevel: 'info',
    port: 8081,
    secretKey: 'ovaphlow'
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  storage: {
    user: 'ovaphlow',
    password: 'ovaph@HD.1123',
    host: '192.168.1.154',
    database: 'haxi'
  },
  proxy: {
    url: 'http://127.0.0.1:8080'
  }
}

const develConfig = {
  app: {
    env: 'development',
    logLevel: 'debug',
    port: 8081,
    secretKey: 'ovaphlow'
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  storage: {
    user: 'ovaphlow',
    password: 'ovaph@HD.1123',
    host: '192.168.1.139',
    database: 'haxi'
  },
  proxy: {
    url: 'http://127.0.0.1:8080'
  }
}

module.exports = develConfig