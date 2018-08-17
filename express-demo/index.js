const startupDebugger = require('debug')('app:startup');
// as time of running DEBUG=app:startup,app:db nodemon index.js
//export DEBUG=app:*
//export DEBUG=app:startup,app:db
//export DEBUG=app:startup
//export DEBUG=

const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./logger');
const authenticator = require('./authenticator');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

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

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];

app.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'})
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = !!courseId && courses.find(c => c.id === courseId);

    // 404
    if(!course) return res.status(404).send('The course with the given ID was not found');

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const id = newCourseId();

    const {error} = validateCourse(req.body);

    if(error) return res.status(400)
                .send(error.details[0].message);



    const course = {
        id: id,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If Not existing return 404
    const courseId = parseInt(req.params.id);
    const course = !!courseId && courses.find(c => c.id === courseId);

    // 404
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Validate
    // Object destructuring
    const {error} = validateCourse(req.body);

    if(error) return res.status(400)
                .send(error.details[0].message);



    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up course
    // Not existing, return 404
    const courseId = parseInt(req.params.id);

    const course = !!courseId && courses.find(c => c.id === courseId);

    // 404
    if(!course) return res.status(404)
                    .send('The course with the given ID was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course that was deleted
    res.send(course);
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Installed nodemon 'npm i -g nodemon'
// 'node index.js' becomes 'nodemon index.js' files will be watched and server restarted

function newCourseId() {
    const courseIds = courses.map(x => x.id);
    if(courseIds.length < 1) {
        courseIds.push(0);
    }

    return Math.max(...courseIds) + 1;}

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}