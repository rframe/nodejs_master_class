// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const emitter = require('./event.js');

var url = 'http://mylogger.io/log';

const logEvent = 'logger.logEvent';

function log(message) {
    // Send an HTTP request
    console.log(message);
}

emitter.on(logEvent, (arg) => { // e, eventArg
    console.log(`Log: ${arg.message}`);
});

module.exports.log = log;
module.exports.logEvent = logEvent;
