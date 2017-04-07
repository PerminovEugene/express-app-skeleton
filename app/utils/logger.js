const logger = require('log4js').getLogger();

module.exports = {
    error: (...arg) => {
        logger.error(...arg);
    },
    warn: (...arg) => {
        logger.warn(...arg);
    },
    log: (...arg) => {
        logger.log(...arg);
    },
    info: (...arg) => {
        logger.info(...arg);
    },
};
