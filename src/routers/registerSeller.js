const registerSeller = require('express').Router();
const registerSellerController = require('../controllers/registerSeller');
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const bcrypt = require('bcrypt');

const rulesregister = [
  body('email')
    .isEmail().withMessage('Email Not Valid'),
  body('username')
    .isLength({min:5}).withMessage('Username should have min 5char')
    .trim().escape(),
  body('password')
    .isLength({min:8}).withMessage('Password should have Minimal 8 char')
    .customSanitizer(async(pass)=>{
      const hash = await bcrypt.hash(pass,10);
      return hash;
    })
];


registerSeller.post('/register',rulesregister,validation,registerSellerController.registerSeller);

module.exports = registerSeller;