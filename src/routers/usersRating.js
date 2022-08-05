const ratings = require('express').Router();

const ratingController = require('../controllers/usersRating');

// ratings.get('/', ratingController.getAll);
// ratings.post('/', ratingController.createRating);
ratings.post('/', ratingController.create);
ratings.get('/', ratingController.read);
ratings.patch('/:id', ratingController.edit);
ratings.delete('/:id', ratingController.delete);

module.exports = ratings;