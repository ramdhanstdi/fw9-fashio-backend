const addressCostumer = require('express').Router();
const addressCostumerController = require('../controllers/addressCostumer');
const authMiddle = require('../middleware/auth');
const { body } = require('express-validator');

const addressValidation = [
  body('phone')
    .isMobilePhone('id-ID')
    .withMessage('Phone number must be indonesian code'),
  body('postal_code')
    .toInt()
    .isNumeric().withMessage('Postal Code must be INT'),
  body('primary_address')
    .isBoolean()
    .withMessage('Must be a boolean true or false')
];

addressCostumer.post('/', authMiddle, ...addressValidation, addressCostumerController.createAddressCostumer);
addressCostumer.get('/', authMiddle, addressCostumerController.getAllUserCostumer);
addressCostumer.patch('/:id', authMiddle, ...addressValidation, addressCostumerController.updateAddressCostumer);
addressCostumer.delete('/:id', authMiddle, addressCostumerController.deleteAddressCostumer);
addressCostumer.get('/:id', addressCostumerController.detailAddressCostumer);
//usersCostumer.get('/', body('limit').toInt(), body('page').toInt(),userController.getAllUsers);
//console.log();

module.exports = addressCostumer ;