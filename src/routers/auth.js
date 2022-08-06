const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const validationCheck = require('../middleware/checkValidation');

const registValidator = [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
  body('username')
    .exists({checkFalsy: true}).withMessage('Enter an Username')
    .isLength({min: 6}).withMessage('Username must be more than 6 characters'),
  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(async val =>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }), 
];


const loginValidator =  [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
];

auth.post('/register-costumer', ...registValidator, validationCheck, authController.registerCostumer);
auth.post('/login-costumer', ...loginValidator, validationCheck, authController.loginCostumer);

module.exports = auth ;

