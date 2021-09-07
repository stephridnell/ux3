const express = require('express')
const router = express.Router()

// POST /auth/signin
router.post('/signin', (req, res) => {
  res.send('Auth > signin')
})

// /auth/validate
router.get('/validate', (req, res) => {
  res.send('Auth > validate')
})

module.exports = router