const transactionController = require('../controllers/transaction');
const transaction = require('express').Router();
const { body } = require('express-validator');
const auth = require('../controllers/auth');
const validation = require('../middleware/validation');

const rules = [
  body('quantity')
    .isNumeric()
    .withMessage('Please input number'),
  body('total_amount')
    .isNumeric()
    .withMessage('Please input number'),
  body('product_id')
    .isNumeric()
    .withMessage('Please input number'),
  body('seller_id')
    .isNumeric()
    .withMessage('Please input number'),
  body('costumer_id')
    .isNumeric()
    .withMessage('Please input number'),


];
  
transaction.get('/transaction' ,auth,transactionController.getAllTransaction);
transaction.get('/transaction/:id',auth,transactionController.getDetailTransaction);
transaction.post('/transaction',auth,rules,validation, transactionController.createTransaction);
transaction.patch('/transaction/:id',auth,rules,validation, transactionController.updateTransaction);
transaction.delete('/transaction/:id',auth,transactionController.deleteTransaction);

module.exports = transaction;