
const winston = require('winston');


const consoleTransport = new (winston.transports.Console)({
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  json: false,
  colorize: true,
  level: process.env.ENV === 'development' ? 'debug' : 'info',
});
const transports = [consoleTransport];
module.exports = winston.createLogger({
  transports,
});
