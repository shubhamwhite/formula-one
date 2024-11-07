const app = require('./app')
const config = require('./src/config')
const { cli } = require('./src/helper/color')

app.listen(config.PORT, (error) => {
  if (error) {
    console.log(cli.serverError(` User service is not running on http://localhost:${config.PORT} : error is : ${ error.message } `))
  } else {
    console.log(cli.serverSuccess(` User service is running on http://localhost:${config.PORT} `))
  }
})
  