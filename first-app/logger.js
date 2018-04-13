const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {

    constructor() {
        super();
        this.url = 'http://mylogger.io/log';
        this.logEvent = 'logger.logEvent';
        this.messageLogged = 'logger.messageLogged';
        this.count = 0;
        this.on(this.logEvent, (arg) => { // e, eventArg
            this.log(`Log: ${arg.message}`);
        });
    }
    log(message) {
        // Send an HTTP request
        console.log(message);
        // Raise an event
        this.emit(this.messageLogged, {id: ++this.count, url: 'http://'});
    }
}




module.exports = Logger;
