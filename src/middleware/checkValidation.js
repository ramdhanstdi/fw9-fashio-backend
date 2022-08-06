const { validationResult } = require('express-validator');
const response = require('../helpers/standardResponse');

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 'Validation Error', errors.array(), null, 400);
  }
  next();
};

module.exports = validation;