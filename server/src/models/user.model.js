const mongoose = require('mongoose')
const { Url } = require('../constant/url.contant')
const defaultProfilePic = '/user/default/user.png'

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: Url._backend_url + defaultProfilePic }, // Add this line
},
{
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
