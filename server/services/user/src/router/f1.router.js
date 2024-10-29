// src/routes/f1Routes.js
const router = require('express').Router()
const f1Controller = require('../controller/f1.controller')

router.get('/current-scoreboard', f1Controller.getCurrentScoreboard)

module.exports = router
