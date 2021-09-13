const mongoose = require('mongoose')
const { Schema } = require('mongoose')
require('mongoose-type-email')
const Utils = require('../Utils')

const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    createIndexes: { unique: true }
  },
  accessLevel: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// make sure email is unique when creating a new user
schema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({ email: value })
  return !emailCount
}, 'User with this email already exists')

// hash password on new account (middleware)
schema.pre('save', function (next) {
  hashPassword(next, this)
})

// hash password on updating an existing account (middleware)
schema.pre('findOneAndUpdate', function (next) {
  hashPassword(next, this._update)
})

function hashPassword (next, self) {
  // check if password is present (should not be present if not modified)
  if (self.password) {
    // replace original password with new hashed password
    self.password = Utils.hashPassword(self.password)
  }
  next()
}

const model = mongoose.model('User', schema)

module.exports = model