const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')
const { Url } = require('../constant/url.contant')
const { User: _User, Refresh: _Refresh } = require('../models')
const { validateRegister, validateUpdateUser } = require('../validator/user.validator')
const CustomErrorHandler = require('../utils/CustomError.utils')
const { JwtUtils } = require('../utils/jwt.util')
const config = require('../config')

// ** User Registration Api

exports.registerUser = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = validateRegister(req.body)
    if (error) {
      return next(CustomErrorHandler.invalidInput(error.details.map(err => err.message).join(', ')))
    }

    const { user_name, email, password, repeat_password } = value

    const UserNameExisted = await _User.exists({ user_name: user_name })
    if (UserNameExisted) {
      return next(CustomErrorHandler.alreadyExist('This Username is already registered.'))
    }
    const emailExisted = await _User.exists({ email: email })
    if (emailExisted) {
      return next(CustomErrorHandler.alreadyExist('This Email is already registered.'))
    }

    if (password !== repeat_password) {
      return next(CustomErrorHandler.invalidInput('Password and re-entered password do not match.'))
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create Entry
    const userCreated = new _User({
      user_name: user_name,
      email: email,
      password: hashedPassword,
    })

    const createEntry = await userCreated.save()

    // Access token generation
    const accessTokenGenerate = JwtUtils.sign({ _id: createEntry._id })

    // Refresh token
    const refreshTokenGenerate = JwtUtils.sign({ _id: createEntry._id }, '1m', config.REFRESH_SECRET)

    await _Refresh.create({ token: refreshTokenGenerate }) // Refresh token stored in the database

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        createEntry,
        access_token: accessTokenGenerate,
        refresh_token: refreshTokenGenerate
      }
    })
  } catch (err) {
    return next(err)
  }
}

// ** User update details
exports.updateUserDetails = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = validateUpdateUser(req.body)
    if (error) {
      return next(CustomErrorHandler.invalidInput(error.details.map(err => err.message).join(', ')))
    }

    // Extract validated data from request body
    const { user_name, first_name, last_name, email, phone_number } = value
    const userId = req.user._id

    // Find user by ID
    const user = await _User.findById(userId)
    if (!user) {
      return next(CustomErrorHandler.notFound('User not found.'))
    }

    // Check if the email or username is being updated and already exists for another user
    if (email && email !== user.email) {
      const emailExisted = await _User.exists({ email: email })
      if (emailExisted) {
        return next(CustomErrorHandler.alreadyExist('This Email is already registered.'))
      }
      user.email = email
    }

    if (user_name && user_name !== user.user_name) {
      const userNameExisted = await _User.exists({ user_name: user_name })
      if (userNameExisted) {
        return next(CustomErrorHandler.alreadyExist('This Username is already registered.'))
      }
      user.user_name = user_name
    }

    // Update other details
    if (first_name) user.first_name = first_name
    if (last_name) user.last_name = last_name
    if (phone_number) user.phone_number = phone_number

    // Handle avatar upload if a file is provided (Optional)
    if (req.file) {
      // Check if there's an existing avatar
      if (user.avatar) {
        // Build the path to the existing avatar file
        const oldAvatarPath = path.join(__dirname, '../public/user/upload', user.avatar.split('/').pop())

        // Delete the existing avatar file
        fs.unlink(oldAvatarPath, (err) => {
          if (err) {
            console.error(`Failed to delete old avatar: ${err.message}`)
          }
        })
      }

      // Update the avatar path with the new file
      user.avatar = `/user/upload/${req.file.filename}` // Ensure this path is correct
    }

    // Save updated user details
    const updatedUser = await user.save()

    // Return success response
    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    })

  } catch (err) {
    return next(err)
  }
}

// ** User login Api

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate user input
    if (!email || !password) {
      return next(CustomErrorHandler.invalidInput('Email and password are required.'))
    }

    // Check if the user exists
    const user = await _User.findOne({ email })
    if (!user) {
      return next(CustomErrorHandler.invalidInput('Invalid email or password.'))
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return next(CustomErrorHandler.invalidInput('Invalid email or password.'))
    }

    // Access token generation
    const accessTokenGenerate = JwtUtils.sign({ _id: user._id })

    // Refresh token
    const refreshTokenGenerate = JwtUtils.sign({ _id: user._id }, '1m', config.REFRESH_SECRET)

    await _Refresh.create({ token: refreshTokenGenerate }) // Refresh token stored in the database

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        access_token: accessTokenGenerate,
        refresh_token: refreshTokenGenerate,
      },
    })
  } catch (err) {
    return next(err)
  }
}

// ** get Personal information
exports.getUserInformation = async (req, res, next) => {
  try {
    const getProfile = await _User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v')

    if (!getProfile) {
      return next(CustomErrorHandler.notFound('User is not found'))
    }

    // Append the base URL to the avatar if it exists
    const userProfile = {
      ...getProfile._doc, // Extract the document fields from the Mongoose object
      avatar: getProfile.avatar ? `${Url._backend_url}${getProfile.avatar}` : null
    }

    res.status(200).json({
      message: 'User profile fetched successfully',
      userProfile: userProfile,
    })
  } catch (err) {
    return next(err)
  }
}