const auth = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const validationCheck = require('../middleware/checkValidation');

const registerUserValidator = [
  body('email')
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Wrong Email Format'),
  body('username')
    .notEmpty().withMessage('Username Required')
    .isLength({min: 6}).withMessage('Username must be more than 6 characters'),
  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(
      async val =>{
        const hash = await bcrypt.hash(val, 10);
        return hash;
      })
];


const loginValidator =  [
  body('email')
    .exists({checkFalsy: true}).withMessage('Enter an Email')
    .isEmail().withMessage('Wrong Email Format'),
  body('password')
    .exists({checkFalsy: true}).withMessage('Enter a Password')
];

const registerSellerValidator = [
  body('phone')
    .notEmpty().withMessage('Phone Number Required')
    .isMobilePhone('id-ID').withMessage('Phone number must be indonesian code'),
  body('store_name')
    .notEmpty().withMessage('Store Name Required'),
  body('email')
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Wrong Email Format'),
  body('username')
    .notEmpty().withMessage('Username Required')
    .isLength({min: 6}).withMessage('Username must be more than 6 characters'),
  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(
      async val =>{
        const hash = await bcrypt.hash(val, 10);
        return hash;
      })
];

auth.post('/register-costumer', ...registerUserValidator, validationCheck, authController.registerCostumer);
auth.post('/login-costumer', ...loginValidator, validationCheck, authController.loginCostumer);
auth.post('/register-seller', ...registerSellerValidator, validationCheck, authController.registerSeller);
auth.post('/login-seller', ...loginValidator, validationCheck, authController.loginSeller);

module.exports = auth ;

