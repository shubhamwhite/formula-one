const express = require('express')
const router = express.Router()
const errorHandler = require('../middleware/error.middleware.js')
const { auth } = require('../middleware/auth.middleware.js')

const { 
  registerUser, 
  loginUser,
  getUserInformation
} = require('../controller') 

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/details').get(auth, getUserInformation)
router.use(errorHandler)

module.exports = router