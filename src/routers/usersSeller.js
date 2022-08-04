const usersSeller = require('express').Router();
const usersSellerController = require('../controllers/usersSeller');

usersSeller.post('/'),usersSellerController.createUsersSeller;

module.exports=usersSeller;