const response = require('../helpers/standardResponse');
const {validationResult} = require('express-validator');

const validation = (req,res,next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Accured',validation.array(),null, 400);
  }
  next();
};

module.exports = validation;