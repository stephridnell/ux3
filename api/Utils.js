// dependencies
require('dotenv').config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 *
 * A class of utility methods that are used throughout the api
 * @class Utils
 */
class Utils {
  /**
   * Encrypts a password using crypto and returns hashed string
   * @param {String} password
   * @return {String}
   * @memberof Utils
   */
  hashPassword (password) {
    // salt is a random string added to a hash to make the password unique
    // even if another user has the same password
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')
    return [salt, hash].join('$')
  }

  /**
   * Compare the password provided at signin with the hash of the password
   * in the database
   * @param {String} password - the plaintext password entered at signin
   * @param {String} original - the hashed password stored in the database
   * @return {Boolean} false if password does not match, true if match
   * @memberof Utils
   */
  verifyPassword (password, original) {
    const originalHash = original.split('$')[1]
    const salt = original.split('$')[0]
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')
    return hash === originalHash
  }

  /**
   * Generate access token using JWT
   * @param {Object} user - the user requesting the token
   * @return {String} 
   * @memberof Utils
   */
  generateAccessToken (user) {
    return jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: '30min' }
    )
  }
}

module.exports = new Utils()
