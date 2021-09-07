const express = require('express')
const router = express.Router()
const User = require('./../models/User')

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// router.post('/', (req, res) => {
//   res.send('add new user')
// })

module.exports = router