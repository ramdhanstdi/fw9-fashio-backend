const productSeller = require('express').Router();
const productSellerController = require('../controllers/productSeller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


productSeller.get('/ProductSeller',auth,productSellerController.showProductStore);
productSeller.get('/allProducts',productSellerController.showAllProduct);
productSeller.post('/ProductSeller',auth,upload,productSellerController.createProduct);
productSeller.patch('/ProductSeller',auth,upload,productSellerController.editProduct);
productSeller.post('/addVariantProduct',auth,productSellerController.addVariant);
productSeller.post('/updateSizeStock',auth,productSellerController.addSizeAndStock);
productSeller.delete('/ProductSeller/:id',auth,productSellerController.deleteProduct);

module.exports=productSeller;