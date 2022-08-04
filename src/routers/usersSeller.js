const usersSeller = require('express').Router();
const usersSellerController = require('../controllers/usersSeller');

usersSeller.get('/:id',usersSellerController.getDetailUsersSeller);
usersSeller.post('/',usersSellerController.createUsersSeller);
usersSeller.get('/',usersSellerController.getUsersSeller);
usersSeller.patch('/:id',usersSellerController.editUsersSeller);
usersSeller.delete('/:id',usersSellerController.deleteUsersSeller);

module.exports=usersSeller;