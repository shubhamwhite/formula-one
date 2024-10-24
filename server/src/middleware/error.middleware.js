const config = require('../config')
const { ValidationError } = require('joi')
const CustomErrorHandler = require('../utils/CustomError.utils')

const errorHandler = (err, req, res, next) => {
  let success = false
  let statusCode = 500
  let data = {
    message: 'Internal server error', 
    orignalError: config.DEBUG_MODE === 'true' ? err.message : 'Something went wrong' 
  }

  // Handle Joi validation errors
  if (err instanceof ValidationError) {
    success = false
    statusCode = 422
    data = {
      message: err.details.map(detail => detail.message).join(', '), // Show detailed validation messages
    }
  }

  // Handle custom errors from CustomErrorHandler
  if (err instanceof CustomErrorHandler) {
    success = false
    statusCode = err.status || 400 // Default to 400 if no status is defined
    data = {
      message: err.message,
    }
  }

  // Log the error for debugging (optional, but recommended)
  console.error(err) // Log the error to the console for development purposes

  // Send response
  return res.status(statusCode).json({ success, data })
}

module.exports = errorHandler
