const registerSeller = require('../models/registerSeller');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.registerSeller = async(req,res) =>{
  registerSeller.registerSellerModel(req.body,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }else{
      return response(res,'Success Create Account Seller',result.rows[0]);
    }
  });
};