// dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000

// database connection
connectDatabase()

// express app setup
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('*', cors())

// routes
// homepage
app.get('/', (req, res) => {
  res.send('homepageee')
})

// user routes
app.use('/user', require('./routes/user'))

// auth routes
app.use('/auth', require('./routes/auth'))

// run app (listen on port)
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})

// i prefer to use async/await syntax so i created an async function
// for connecting the database
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