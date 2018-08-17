const express = require('express');
const router = express.Router();
const Joi = require('joi');


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

router.get('/', (req, res) => {
    res.send(courses);
});
// /api/courses/1
router.get('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = !!courseId && courses.find(c => c.id === courseId);

    // 404
    if(!course) return res.status(404).send('The course with the given ID was not found');

    res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;