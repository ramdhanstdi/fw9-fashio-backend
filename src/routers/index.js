const router = require('express').Router();

//Router Admin
router.use('/admin/profileSeller', require('./profileSeller'));

//Router Users
router.use('/seller',require('./registerSeller'));
router.use('/',require('./productSeller'));
router.use('/',require('./loginSeller'));
router.use('/',require('./chat'));
router.use('/', require('./auth'));
router.use('/address-costumer', require('./addressCostumer'));

module.exports = router;