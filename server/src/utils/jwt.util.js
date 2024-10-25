const config = require('../config')
const jwt = require('jsonwebtoken')

class JwtUtils {
  static sign(payload, expiry = '2m', secret = config.JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry })
  }
  static verify(token, secret = config.JWT_SECRET) {
    return jwt.verify(token, secret)
  }
}

module.exports = { JwtUtils }