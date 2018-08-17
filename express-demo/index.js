const startupDebugger = require('debug')('app:startup');
// as time of running DEBUG=app:startup,app:db nodemon index.js
//export DEBUG=app:*
//export DEBUG=app:startup,app:db
//export DEBUG=app:startup
//export DEBUG=

const dbDebugger = require('debug')('app:db');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const home = require('./routes/home');
const courses = require('./routes/courses');
app.set('view engine', 'pug');
// optional
// app.set('views', './views')  // './views is default value



const nodeEnv = process.env.NODE_ENV;// undefined if not set
// console.log(`NODE_ENV: ${nodeEnv}`);

const env = app.get('env');
// console.log(`app env: ${env}`);
// export NODE_ENV=production - set environment variable on mac
// set NODE_ENV=production - set environment variable on windows
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value, req.body
app.use(express.static('public'));
app.use(helmet());

// Define Routes
app.use('/', home);
app.use('/api/courses', courses);

// Configuration

console.log(`Applciation Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);
console.log(`sub_name: ${config.get('sub_name')}`);

if(env === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled....');
}

// Database work
dbDebugger('Connected to the database...');

app.use(logger);

app.use(authenticator);





// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Installed nodemon 'npm i -g nodemon'
// 'node index.js' becomes 'nodemon index.js' files will be watched and server restarted
