const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const stripFinalNewline = require('strip-final-newline');

const logger = createLogger({
    format: format.simple(),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

morgan.token('id', req => req.id);

const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';
const requests = morgan(requestFormat, {
    stream: {
        write: (message) => {
            // Remove all line breaks
            const log = stripFinalNewline(message);
            return logger.info(log);
        }
    }
});

// Attach to logger object
logger.requests = requests;

module.exports = logger;