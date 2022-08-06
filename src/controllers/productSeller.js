const productSeller = require('../models/productSeller');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.createProduct = (req,res) =>{
  const sellerId = req.userAuth.id;
  productSeller.createProductModel(req.body,sellerId,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }else{
      return response(res,'Product Added',result);
    }
  });
};

exports.editProduct = (req,res) => {
  const sellerId= req.userAuth.id;
  productSeller.editProductModel(req.params.id,sellerId,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Product Edited', result.rows[0]);
  });
};