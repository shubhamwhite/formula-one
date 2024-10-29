const express = require('express')
const router = express.Router()
const upload = require('../helper/multer.js')
const errorHandler = require('../middleware/error.middleware.js')
const { auth } = require('../middleware/auth.middleware.js')

const { 
  registerUser, 
  loginUser,
  getUserInformation,
  updateAvatar,
  getAvatar
} = require('../controller/index.js') 

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/details').get(auth, getUserInformation)
router.route('/update/avatar').post(auth, upload.single('avatar'), updateAvatar)
router.route('/get/avatar').get(auth, getAvatar)
router.use(errorHandler)

module.exports = router