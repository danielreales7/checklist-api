const { createLogger, format, tranposrts } = require('winston');

const logger = createLogger({
    format: format.simple(),
    transports: [new tranposrts.Console()]
})

module.exports = logger;