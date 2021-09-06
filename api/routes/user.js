const express = require('express')
const router = express.Router()

// GET
router.get('/', (req, res) => {
  res.json([{ name: 'im a user' }])
})

// router.post('/', (req, res) => {
//   res.send('add new user')
// })

module.exports = router