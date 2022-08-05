const usersCostumer = require('express').Router();
const userCostumerController = require('../controllers/usersCostumer');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');


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

const editUserValidator = [
  body('email')
    .isEmail().withMessage('Wrong Email Format'),
  body('username')
    .isLength({min: 6}).withMessage('Username must be more than 6 characters'),
  body('password')
    .isLength({min: 6}).withMessage('Password must be more than 6 characters')
    .customSanitizer(
      async val =>{
        const hash = await bcrypt.hash(val, 10);
        return hash;
      })
];

usersCostumer.get('/', userCostumerController.getAllUserCostumer);
usersCostumer.post('/', ...registerUserValidator, userCostumerController.createUserCostumer);
usersCostumer.patch('/:id', ...editUserValidator, userCostumerController.updateUserCostumer);
usersCostumer.delete('/:id', userCostumerController.deleteUserCostumer);
usersCostumer.get('/:id', userCostumerController.detailUserCostumer);
//usersCostumer.get('/', body('limit').toInt(), body('page').toInt(),userController.getAllUsers);
//console.log();

module.exports = usersCostumer ;