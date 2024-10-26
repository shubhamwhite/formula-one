const config = require('../config')
const { ValidationError } = require('joi')
const CustomErrorHandler = require('../utils/CustomError.utils')

const errorHandler = (err, req, res, next) => {
  let success = false
  let statusCode = 500
  let data = {
    message: 'Internal server error',
    originalError: config.DEBUG_MODE === 'true' ? err.message : 'Something went wrong' 
  }

  if (err instanceof ValidationError) {
    success = false
    statusCode = 422
    data = {
      message: err.details.map(detail => detail.message).join(', '),
    }
  }

  if (err instanceof CustomErrorHandler) {
    success = false
    statusCode = err.status || 400 
    data = {
      message: err.message,
    }
  }

  console.error(err)

  return res.status(statusCode).json({ success, data })
}

module.exports = errorHandler
