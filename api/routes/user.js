const express = require('express')
const router = express.Router()

const User = require('./../models/User')

const isEmpty = require('lodash/isEmpty')

// GET all users
router.get('/', async (_req, res) => {
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

router.get('/:id', async ({ params }, res) => {
  try {
    const user = await User.findById(params.id)
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

router.post('/', async ({ body }, res) => {
  if (!body || isEmpty(body)) {
    return res.status(400).json({
      message: 'Request body is empty'
    })
  }

  const newUser = new User({
    ...body
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

router.put('/:id', async ({ params, body }, res) => {
  if (!body || isEmpty(body)) {
    return res.status(400).json({
      message: 'Request body is empty'
    })
  }

  // check for email field conflict with other users
  // _id NOT EQUALS the one from the request params
  // because we are looking for conflicts within other users
  let emailCount = await User.countDocuments({ _id: { $ne: params.id }, email: body.email })
  if (emailCount) {
    return res.status(409).json({
      message: 'User with this email already exists'
    })
  }

  try {
    const user = await User.findByIdAndUpdate(params.id, body, { new: true })
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist'
      })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Error updating User',
      error
    })
  }

})

router.delete('/:id', async ({ params }, res) => {
  try {
    await User.findByIdAndDelete(params.id)
    res.json({
      message: 'User deleted'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting User',
      error
    })
  }
})

module.exports = router