const productSeller = require('express').Router();
const productSellerController = require('../controllers/productSeller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


productSeller.get('/showProductSeller',auth,productSellerController.showProductStore);
productSeller.post('/inputProduct',auth,upload,productSellerController.createProduct);
productSeller.patch('/editProduct',auth,upload,productSellerController.editProduct);
productSeller.post('/addVariantProduct',auth,productSellerController.addVariant);
productSeller.post('/updateSizeStock',auth,productSellerController.addSizeAndStock);

module.exports=productSeller;