// src/routes/f1Routes.js
const router = require('express').Router()
const f1Controller = require('../controller/f1.controller')

router.get('/current-scoreboard', f1Controller.getCurrentScoreboard)
router.get('/upcoming-race', f1Controller.upcomingRacese)
router.get('/news-report', f1Controller.newsReport)

router.get('/testing-dashboard', f1Controller.fetchAndConvertXMLtoJSON)

module.exports = router
