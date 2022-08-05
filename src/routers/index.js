const router = require('express').Router();

//Router Admin
router.use('/admin/profileSeller', require('./profileSeller'));

//Router Users

module.exports = router;