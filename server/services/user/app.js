// app.js
const express = require('express')
const cors = require('cors')
const connectMongoDB = require('./src/db/mongodb')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(express.static(path.join(__dirname, './src/public'))) 

connectMongoDB()
 
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use('/api/v1', require('./src/router/user.router'))
app.use('/api/f1', require('./src/router/f1.router'))

module.exports = app
