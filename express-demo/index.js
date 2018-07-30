const express = require('express');
const app = express();

app.use(express.json());

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
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    let course = null;
    if(!!courseId) {
        course = courses.find(c => c.id === courseId);
    }
    if(!course) {
        // 404
        res.status(404).send('The course with the given ID was not found')
    }
    res.send(course);
});

app.post('api/courses', (res, req) => {
    const id = courses.length + 1;

    if(!!res.body.name) {
        const course = {
            id: id,
            name: res.body.name
        };
        courses.push(course);
        res.send(course);
    } else {
        res.status(400).send('Course name is required')
    }
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Installed nodemon 'npm i -g nodemon'
// 'node index.js' becomes 'nodemon index.js' files will be watched and server restarted