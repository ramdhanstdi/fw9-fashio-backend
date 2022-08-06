const loginSeller = require('express').Router();
const loginSellerController = require('../controllers/loginSeller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


loginSeller.get('/showStore',auth,loginSellerController.showStore);
loginSeller.post('/loginseller',loginSellerController.loginUser);
loginSeller.patch('/editSeller',auth,upload,loginSellerController.editSeller);

module.exports=loginSeller;