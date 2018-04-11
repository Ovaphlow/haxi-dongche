const prodConfig = {
  app: {
    env: 'development',
    logLevel: 'info',
    port: 80,
    secretKey: 'ovaphlow'
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  proxy: {
    url: 'http://127.0.0.1:8080'
  }
}

const develConfig = {
  app: {
    env: 'development',
    logLevel: 'debug',
    port: 80,
    secretKey: 'ovaphlow'
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  },
  proxy: {
    url: 'http://127.0.0.1:8080'
  }
}

module.exports = develConfig