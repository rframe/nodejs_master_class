const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

// http://localhost:3001/api/posts/2018/1?sortBy=name
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
    // res.send(req.params);
});

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Installed nodemon 'npm i -g nodemon'
// 'node index.js' becomes 'nodemon index.js' files will be watched and server restarted