const express = require('express')
const router = express.Router()
const errorHandler = require('../middleware/error.middleware.js')
const { auth } = require('../middleware/auth.middleware.js')

const { 
  registerUser, 
  loginUser
} = require('../controller') 

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)

router.use(errorHandler)

module.exports = router