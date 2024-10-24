class CustomErrorHandler extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }
  
  static alreadyExist(message) {
    return new CustomErrorHandler(409, message)
  }
   
  static invalidInput(message) {
    return new CustomErrorHandler(401, message)
  }
    
  static notFound(message) {
    return new CustomErrorHandler(404, message)
  }
  
  static serverError(message) {
    return new CustomErrorHandler(500, message)
  }
  
  static unauthorized(message) {
    return new CustomErrorHandler(401, message)
  }
}
  
module.exports = CustomErrorHandler