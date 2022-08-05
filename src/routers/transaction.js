const transactionController = require('../controllers/transaction');
const express = require('express');
const Router = express.Router();
const { body } = require('express-validator');
// const checkId = require('../middleware/checkId');

const validation = [
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
  
Router.get('/', transactionController.getAllTransaction);
Router.get('/:id', transactionController.getDetailTransaction);
Router.post('/', validation, transactionController.createTransaction);
Router.patch('/:id', validation, transactionController.updateTransaction);
Router.delete('/:id', transactionController.deleteTransaction);

module.exports = Router;