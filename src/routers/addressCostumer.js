const addressCostumer = require('express').Router();
const addressCostumerController = require('../controllers/addressCostumer');
const authMiddle = require('../middleware/auth');
const { body } = require('express-validator');

const addressValidation = [
  body('recepient_phone')
    .isMobilePhone('id-ID')
    .withMessage('Phone number must be indonesian code'),
  // body('postal_code')
  //   .toInt()
  //   .isNumeric().withMessage('Postal Code must be INT'),
];

addressCostumer.post('/', authMiddle, ...addressValidation, addressCostumerController.createAddressCostumer);
addressCostumer.get('/', authMiddle, addressCostumerController.getAllUserCostumer);
addressCostumer.patch('/:id', authMiddle, ...addressValidation, addressCostumerController.updateAddressCostumer);
addressCostumer.delete('/:id', authMiddle, addressCostumerController.deleteAddressCostumer);
addressCostumer.get('/:id',authMiddle, addressCostumerController.detailAddressCostumer);
//usersCostumer.get('/', body('limit').toInt(), body('page').toInt(),userController.getAllUsers);
//console.log();
// undermaintain yoga
addressCostumer.patch('/edit/:id', authMiddle, ...addressValidation, addressCostumerController.editAddess);
// undermaintain yoga

module.exports = addressCostumer ;