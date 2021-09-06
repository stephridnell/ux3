// dependencies
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000


// database connection

// express app setup
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', cors())

// routes
// homepage
app.get('/', (req, res) => {
  res.send('homepage')
})

// run app (listen on port)
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})