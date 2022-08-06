const productSeller = require('express').Router();
const productSellerController = require('../controllers/productSeller');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const {body} = require('express-validator');

const rulesProduct = [
  body('name_product').isLength({min:5}).escape(),
  body('description').isLength({min:10}),
  body('color').isLength({min:1}),
  body('stock').isLength({min:1})
];


productSeller.post('/inputProduct',auth,rulesProduct,validation,productSellerController.createProduct);
productSeller.patch('/editProduct',auth,rulesProduct,validation,productSellerController.editProduct);

module.exports=productSeller;