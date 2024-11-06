const express = require('express')
const cors = require('cors')
const config = require('./src/config')
const { cli } = require('./src/helper/color')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
 
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use('/api/f1/betting', require('./src/router/f1.router'))

app.listen(config.PORT, (error) => {
  if (error) {
    console.log(cli.error(` Betting service is not running on http://localhost:${config.PORT} : error is : ${ error.message } `))
  } else {
    console.log(cli.success(` Betting service is running on http://localhost:${config.PORT} `))
  }
})
     