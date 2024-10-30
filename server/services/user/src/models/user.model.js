const mongoose = require('mongoose')
const defaultProfilePic = '/user/default/user.png'

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  role: { type:String, default: 'User' },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: defaultProfilePic }, // Add this line
},)

const User = mongoose.model('User', userSchema)

module.exports = { User }
