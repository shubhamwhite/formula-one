const Joi = require('joi')

const registerSchema = Joi.object({
  user_name: Joi.string().min(3).max(30).required(),
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(10).max(15),
  repeat_password: Joi.string().min(6).required()
})

module.exports = {
  validateRegister: (data) => registerSchema.validate(data, { abortEarly: false })
}
