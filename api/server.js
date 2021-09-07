// dependencies
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000

// database connection
connectDatabase()

// express app setup
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', cors())

// routes
// homepage
app.get('/', (req, res) => {
  res.send('homepageee')
})

// user
app.use('/user', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

// run app (listen on port)
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})

async function connectDatabase () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('db connected\n')
  } catch (err) {
    console.log('error connecting db: ' + err.message + '\n')
  }
}