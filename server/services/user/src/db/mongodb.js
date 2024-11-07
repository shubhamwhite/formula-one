const mongoose = require('mongoose')
const config = require('../config')
const { cli } = require('../helper/color')

const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_DB_URI, { })
    console.log(cli.dbSuccess(' Connected to MongoDB DataBase '))
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1) 
  }
}

module.exports = connectMongoDB
