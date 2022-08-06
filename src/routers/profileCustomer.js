const profileController = require('../controllers/profileCustomer');
const express = require('express');
const Router = express.Router();
const { body } = require('express-validator');


const validation = [
  body('phone')
    .isLength({ min: 11 })
    .withMessage('Please input phone number correctly (min 11 digit)')
    .isNumeric()
    .withMessage('Please input number only'),
  body('full_name')
    .isLength({ min: 2 })
    .withMessage('Please input your fullname correctly'),
];

Router.get('/', profileController.getAllProfile);
Router.get('/:id', profileController.getDetailProfile);
Router.post('/', validation, profileController.createProfile);
Router.patch('/:id', validation, profileController.updateProfile);
Router.delete('/:id', profileController.deleteProfile);

module.exports = Router;
