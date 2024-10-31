const f1Api = require('../api/thirdParty.api')

exports.getCurrentScoreboard = async (req, res) => {
  try {
    const scoreboard = await f1Api.getCurrentScoreboard()
    res.json(scoreboard)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch scoreboard', error: error.message })
  }
}