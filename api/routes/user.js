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

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const notFoundMsg = `User does not exist`

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).send(notFoundMsg)
      return
    }
    res.json(user)
  } catch (err) {
    res.status(404).send(notFoundMsg)
  }
})

// router.post('/', (req, res) => {
//   res.send('add new user')
// })

module.exports = router