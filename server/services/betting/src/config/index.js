
require('dotenv').config()
  
const config = { 
  PORT: process.env.PORT || 3004,
  THIRD_PARTY_API_KEY: process.env.THIRD_PARTY_API_KEY,
  THIRD_PARTY_API_HOST: process.env.THIRD_PARTY_API_HOST
}

module.exports = Object.freeze(config)
