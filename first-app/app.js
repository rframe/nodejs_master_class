// const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();



// Register a listener
logger.on(logger.messageLogged, (arg) => { // e, eventArg
    console.log(`Listener Called id: ${arg.id} url: ${arg.url}`);
});

logger.log('message')


// Raise: logging (data: message)
 logger.emit(logger.logEvent, {message: 'Test Logger'});