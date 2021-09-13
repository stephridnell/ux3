// dependencies
let crypto = require('crypto')

// Utils class
class Utils {
  hashPassword (password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')
    return [salt, hash].join('$')
  }

  verifyPassword (password, original) {
    const originalHash = original.split('$')[1]
    const salt = original.split('$')[0]
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')
    return hash === originalHash
  }
}

module.exports = new Utils()
