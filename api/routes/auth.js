// dependencies
require('dotenv').config()
const express = require('express')
const Utils = require('../Utils')
const User = require('../models/User')
const router = express.Router()
const omit = require('lodash/omit')
const jwt = require('jsonwebtoken')

// POST /auth/signin
router.post('/signin', async ({ body }, res) => {
  // validate email and password
  if (!body.email || !body.password) {
    return res.status(400).json({
      message: 'Must provide email and password'
    })
  }

  // declare user outside the try catch because I don't want all my code
  // wrapped in there
  let user

  // get user
  try {
    user = await User.findOne({
      email: body.email
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error signing in',
      error
    })
  }

  // check that a user was found and that the password is correct
  if (user && Utils.verifyPassword(body.password, user.password)) {
    // omit the password from the user object before putting it into the token
    const userObj = omit(user, ['password'])
    const token = Utils.generateAccessToken(userObj)
    return res.json({
      token,
      user: userObj
    })
  }

  // if we get here either there is no user matching the email
  // or the password is incorrect. we do not tell the user specifically
  // which one because we do not want to let malicious users know what
  // emails are in the db
  return res.status(401).json({
    message: 'Incorrect username or password'
  })
})

// /auth/validate
router.get('/validate', (req, res) => {
  // split the auth header string by space and take the second substring as the jwt
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
    if (err) {
      // if there is an error in the verify callback, return a 403
      return res.sendStatus(403)
    }
    // send user object/token exp to the user
    res.json(tokenData)
  })
})

module.exports = router
