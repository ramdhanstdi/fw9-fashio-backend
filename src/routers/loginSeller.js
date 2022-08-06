const loginSeller = require('express').Router();
const loginSellerController = require('../controllers/loginSeller');
const validation = require('../middleware/validation');
const {body} = require('express-validator');
const auth = require('../middleware/auth');

const rulesregister = [
  body('email')
    .isEmail().withMessage('Email Not Valid'),
  body('username')
    .isLength({min:5}).withMessage('Username should have min 5char')
    .trim().escape()
];

loginSeller.get('/showStore',auth,loginSellerController.showStore);
loginSeller.post('/loginseller',loginSellerController.loginUser);
loginSeller.patch('/editSeller',auth,...rulesregister,validation,loginSellerController.editSeller);

module.exports=loginSeller;