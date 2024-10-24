const mongoose = require('mongoose')

const refreshSchema = new mongoose.Schema({
  token: { 
    type: String,
    unique: true
  }
}, {
  timestamps: false
})

const Refresh = mongoose.model('Refresh', refreshSchema)

module.exports = { Refresh }
