const router = require('express').Router();

//Router Admin
router.use('/admin/profileSeller', require('./profileSeller'));

//Router Users
router.use('/',require('./registerSeller'));
router.use('/',require('./productSeller'));
router.use('/',require('./loginSeller'));
router.use('/',require('./chat'));

//roters up
router.use('/auth', require('./auth'));
router.use('/users-costumer', require('./usersCostumer'));
router.use('/address-costumer', require('./addressCostumer'));

module.exports = router;