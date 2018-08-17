const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());

app.use('/api/genres', genres);




// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});