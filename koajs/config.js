const prodConfig = {
  app: {
    env: 'development',
    logLevel: 'info',
    port: 8000,
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
    port: 8000,
    secretKey: 'ovaphlow'
  },
  auth: {
    excludeUrl: [
      '/api/user/login'
    ]
  }
}

module.exports = develConfig