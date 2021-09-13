const mongoose = require('mongoose')
const { Schema } = require('mongoose')
require('mongoose-type-email')
const Utils = require('./../Utils')

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

// hash password (middleware)
schema.pre('save', function (next) {
  // check if password is present and is modified
  if (this.password && this.isModified()) {
    // replace original password with new hashed password
    this.password = Utils.hashPassword(this.password)
  }
  // continue
  next()
})

const model = mongoose.model('User', schema)

module.exports = model