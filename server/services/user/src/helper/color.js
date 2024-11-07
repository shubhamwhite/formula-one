const clc = require('cli-color')

exports.cli = {

  // service 
  serverSuccess:clc.xterm(202),
  serverError : clc.red.bold,
  serverWarn : clc.yellow,
  serverNotice: clc.blue,

  // database
  dbSuccess: clc.xterm(226)
  
} 