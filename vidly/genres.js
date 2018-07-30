'use strict';

const Joi = require('joi');

class Genres {

    constructor(app) {
        this.location = 'genres';
        this.genres = [
            {id: 1, name: 'horror'},
            {id: 2, name: 'sci-fi'},
            {id: 3, name: 'action'}
        ];

        app.get(`/api/${this.location}`, this.get.bind(this));
        app.get(`/api/${this.location}/:id`, this.getGenre.bind(this));
        app.post(`/api/${this.location}`, this.post.bind(this));
        app.put(`/api/${this.location}/:id`, this.put.bind(this));
        app.delete(`/api/${this.location}/:id`, this.delete.bind(this));
    }

    get(req, res) {
        res.send(this.genres);
    }

    getGenre(req, res) {
        const genreId = parseInt(req.params.id);
        const genre = !!genreId && this.genres.find(g => g.id === genreId);
        if (!genre) return res.status(404).send(`Genre with the provided Id was not found`);
        res.send(genre);
    }

    post(req, res) {
        const {error} = this.validateGenre(req.body);

        if (error) return res.status(400)
                .send(error.details[0].message);

        const id = this.newId();
        const genre = {
            id,
            name: req.body.name
        };
        this.genres.push(genre);
        res.send(genre);
    }

    put(req, res) {
        // Look up the course
        // If Not existing return 404
        const genreId = parseInt(req.params.id);
        const genre = !!genreId && this.genres.find(g => g.id === genreId);

        // 404
        if (!genre) return res.status(404).send('The genre with the given ID was not found');

        // Validate
        // Object destructuring
        const {error} = this.validateGenre(req.body);

        if (error) return res.status(400)
                .send(error.details[0].message);


        // Update course
        // Return the updated course
        genre.name = req.body.name;
        res.send(genre);
    }

    delete(req, res) {


        const genreId = parseInt(req.params.id);

        const genre = !!genreId && this.genres.find(g => g.id === genreId);

        // 404
        if (!genre) return res.status(404)
                .send('The genre with the given ID was not found');

        const index = this.genres.indexOf(genre);
        this.genres.splice(index, 1);

        return genre;

    }

    validateGenre(genre) {
        const schema = {
            name: Joi.string().min(3).required()
        }

        return Joi.validate(genre, schema);
    }


    newId() {
        const ids = this.genres.map(x => x.id);
        if (ids.length < 1) {
            ids.push(0);
        }

        return Math.max(...ids) + 1;
    }
}

module.exports = Genres;
