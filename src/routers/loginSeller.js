const loginSeller = require('express').Router();
const loginSellerController = require('../controllers/loginSeller');
const auth = require('../middleware/auth');


loginSeller.get('/showStore',auth,loginSellerController.showStore);
loginSeller.post('/loginseller',loginSellerController.loginUser);
loginSeller.patch('/editSeller',auth,loginSellerController.editSeller);

module.exports=loginSeller;