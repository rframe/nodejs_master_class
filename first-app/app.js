const EventEmitter = require('events');

const emitter = new EventEmitter();

const messageLogged = 'messageLogged';

// Register a listener
emitter.on(messageLogged, () => {
    console.log('Listener Called');
});

emitter.emit(messageLogged);