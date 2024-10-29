
require('dotenv').config()
  
const config = { 
  PORT: process.env.PORT || 3001,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET:process.env.REFRESH_SECRET,
  DEBUG_MODE: process.env.DEBUG_MODE,
  THIRD_PARTY_API_KEY: process.env.THIRD_PARTY_API_KEY,
  THIRD_PARTY_API_HOST: process.env.THIRD_PARTY_API_HOST
}

module.exports = Object.freeze(config)
