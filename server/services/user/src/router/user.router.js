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

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/details').get(auth, getUserInformation)
router.route('/user/details/update').put(auth, upload.single('avatar'), updateUserDetails)
router.use(errorHandler)
 
module.exports = router