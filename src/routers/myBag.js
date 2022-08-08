const bag = require('express').Router();
const bagController = require('../controllers/myBag');
const auth = require('../middleware/auth');

bag.get('/mybag',auth,bagController.showMyBag);
bag.post('/mybag',auth,bagController.addToBag);
bag.delete('/mybag/:id',auth,bagController.deleteMyBag);

module.exports=bag;