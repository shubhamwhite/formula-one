const app = require('./app')
const config = require('./src/config')
const { cli } = require('./src/helper/color')

app.listen(config.PORT, () => {
  console.log(cli.success(` User service is running on http://localhost:${config.PORT} `))
})
  