const express = require('express')
const router = express.Router()
const User = require('./../models/User')

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: 'Error finding Users',
      error
    })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist'
      })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Error finding User',
      error
    })
  }
})

router.post('/', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Request body is empty'
    })
  }

  const newUser = new User({
    ...req.body
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({
      message: 'Error creating User',
      error
    })
  }
})

module.exports = router