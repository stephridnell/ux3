// dependencies
require('dotenv').config()
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
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