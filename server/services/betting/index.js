const express = require('express')
const cors = require('cors')
const config = require('./src/config')
const { cli } = require('./src/helper/color')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/', require('./src/router/f1.routes'))

app.listen(config.PORT, (error) => {
  if (error) {
    console.log(cli.serverError(` Betting service is not running on http://localhost:${config.PORT} : error is : ${ error.message } `))
  } else {
    console.log(cli.serverSuccess(` Betting service is running on http://localhost:${config.PORT} `))
  }
}) 
      