const loginCostumerModel = require('../models/loginCostumer');
const costumerModel = require('../models/profileCustomer');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.showProfile=(req,res)=>{
  const id= req.authUser.id; 
  loginCostumerModel.showCostumerProfile(id,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'Email Or Password Wrong',null,null,400);
    }
    return response(res,'Profile Show',result.rows[0]);
  });
};

exports.editCostumer = (req,res) => {
  const id= req.authUser.id;
  let photo = null;
  req.files?photo=req.files[0].filename:photo=null;
  costumerModel.updateProfile(id,photo,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'Email Or Password Wrong',null,null,400);
    }else{
      return response(res,'Edit Profile Store Success', result.rows[0]);
    }
  });
};