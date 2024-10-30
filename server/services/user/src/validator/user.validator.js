const Joi = require('joi')

const registerSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.string().min(6).required()
})

const updateUserSchema = Joi.object({
  user_name: Joi.string().min(3).max(30),
  first_name: Joi.string().min(1).max(50),
  last_name: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  phone_number: Joi.string().pattern(/^[0-9]+$/), // Optional regex for phone numbers
})

module.exports = {
  validateRegister: (data) => registerSchema.validate(data, { abortEarly: false }),
  validateUpdateUser: (data) => updateUserSchema.validate(data, { abortEarly: false }),
}
