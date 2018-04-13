// const EventEmitter = require('events');
const logger = require('./logger');

const emitter = require('./event');
// const emitter = new EventEmitter();

const messageLogged = 'messageLogged';

// Register a listener
// emitter.on(messageLogged, (arg) => { // e, eventArg
//     console.log(`Listener Called id: ${arg.id} url: ${arg.url}`);
// });

// emitter.emit(messageLogged, {id: 1, url: 'http://'});


// Raise: logging (data: message)
emitter.emit(logger.logEvent, {message: 'Test Logger'});