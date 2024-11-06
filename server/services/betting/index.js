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

app.use('/api/f1', require('./src/router/f1.router'))

app.listen(config.PORT, () => {
  console.log(cli.success(` Betting service is running on http://localhost:${config.PORT} `))
})
    