const costumerLogin = require('express').Router();
const costumerLoginCostroller = require('../controllers/loginCostumer');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

costumerLogin.get('/profile-costumer',auth,costumerLoginCostroller.showProfile);
costumerLogin.patch('/profile-costumer',auth,upload,costumerLoginCostroller.editCostumer);

module.exports=costumerLogin;