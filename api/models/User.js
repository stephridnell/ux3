const mongoose = require('mongoose')
const { Schema } = require('mongoose')
require('mongoose-type-email')

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
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const model = mongoose.model('User', schema)

module.exports = model