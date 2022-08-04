const { createUsersSellerModel }= require('../models/usersSeller');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const {LIMIT_DATA } = process.env;

exports.createUsersSeller=(req,res)=>{
  createUsersSellerModel(req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Create Success',result.rows[0]);
    }
  });
};