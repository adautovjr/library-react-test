const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  future: {
    webpack5: true
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    return config
  }
})
