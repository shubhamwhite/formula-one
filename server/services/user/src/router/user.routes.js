const express = require('express')
const router = express.Router()
const upload = require('../helper/multer.js')
const errorHandler = require('../middleware/error.middleware.js')
const { auth } = require('../middleware/auth.middleware.js')

const { 
  registerUser, 
  loginUser,
  getUserInformation,
  updateUserDetails
} = require('../controller/index.js') 

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/details').get(auth, getUserInformation)
router.route('/details/update').put(auth, upload.single('avatar'), updateUserDetails)
router.use(errorHandler)
 
module.exports = router