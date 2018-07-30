const Joi = require('joi');
const express = require('express');
const Genres = require('./genres');
const app = express();

app.use(express.json());

const genres = new Genres(app);




// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});