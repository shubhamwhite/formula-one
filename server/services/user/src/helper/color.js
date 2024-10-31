const clc = require('cli-color')

exports.cli = {
  success:clc.xterm(4).bold.bgXterm(10),
  error : clc.red.bold,
  warn : clc.yellow,
  notice: clc.blue
} 