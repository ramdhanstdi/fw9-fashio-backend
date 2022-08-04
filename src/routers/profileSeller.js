const profileSeller = require('express').Router();
const profileSellerControler = require('../controllers/profileSeller');

profileSeller.get('/:id',profileSellerControler.getDetailProfileSeller);
profileSeller.post('/',profileSellerControler.createProfileSeller);
profileSeller.get('/',profileSellerControler.getProfileSeller);
profileSeller.patch('/:id',profileSellerControler.editProfileSeller);
profileSeller.delete('/:id',profileSellerControler.deleteUsersSeller);

module.exports = profileSeller;