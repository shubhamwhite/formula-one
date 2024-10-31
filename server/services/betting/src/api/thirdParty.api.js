// src/api/f1Api.js
const axios = require('axios')
const config = require('../config')

const f1Api = axios.create({
  baseURL: `https://${config.THIRD_PARTY_API_HOST}`,
  headers: {
    'x-rapidapi-key': config.THIRD_PARTY_API_KEY,
    'x-rapidapi-host': config.THIRD_PARTY_API_HOST,
  },
})

const getCurrentScoreboard = async () => {
  try {
    const response = await f1Api.get('/current-scoreboard')
    return response.data
  } catch (error) {
    console.error('Error fetching current scoreboard:', error)
    throw error
  }
}

module.exports = {
  getCurrentScoreboard,
}
