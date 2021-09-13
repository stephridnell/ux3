// dependencies
const express = require('express')
const router = express.Router()
const User = require('../models/User')
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

// GET a single user by ID
router.get('/:id', async ({ params }, res) => {
  try {
    const user = await User.findById(params.id)
    if (!user) {
      // if user does not exist then return a 404 error
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

// POST - new user
router.post('/', async ({ body }, res) => {
  // using lodash isEmpty because if the body is empty it will
  // likely still be an empty object which is ofc truthy
  if (!body || isEmpty(body)) {
    return res.status(400).json({
      message: 'Request body is empty'
    })
  }

  // using the spread operator instead of hardcoding in all the fields
  // that were already defined in the user schema
  const newUser = new User({
    ...body
  })

  try {
    // pre.('save') method inside the User schema will hash the password
    // and the email path validation method will check for email duplicates
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({
      message: 'Error creating User',
      error
    })
  }
})

// PUT - update a user by ID
router.put('/:id', async ({ params, body }, res) => {
  // using lodash isEmpty because if the body is empty it will
  // likely still be an empty object which is ofc truthy
  if (!body || isEmpty(body)) {
    return res.status(400).json({
      message: 'Request body is empty'
    })
  }

  // check for email field conflict with other users
  // _id NOT EQUALS the one from the request params
  // because we are looking for conflicts within other users
  // (email path validation does not get called on a PUT request - i
  // didnt really look into it. i dont like having the same validation
  // in multiple areas but i did it anyway)
  let emailCount = await User.countDocuments({ _id: { $ne: params.id }, email: body.email })
  if (emailCount) {
    return res.status(409).json({
      message: 'User with this email already exists'
    })
  }

  try {
    // password will hash inside pre.('findOneAndUpdate') because pre.('save')
    // is only called when .save() is used (findByIdAndUpdate is just a 
    // wrapper for findOneAndUpdate)
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

// DELETE - delete a user by id
router.delete('/:id', async ({ params }, res) => {
  // i didnt check for an ID because if you dont pass an ID
  // you're not allowed to call DELETE on the route anyway
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
