const bagModel = require('../models/myBag');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.addToBag=(req,res)=>{
  const id=req.authUser.id;
  bagModel.addMyBagModel(id,req.body,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    return response(res,'Adding To Bag',result.rows[0]);
  });
};

exports.showMyBag=(req,res)=>{
  const id = req.authUser.id;
  bagModel.getMyBagModel(id,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    return response(res,'Showwing My Bag',result.rows);
  });
};

exports.deleteMyBag=(req,res)=>{
  bagModel.deleteMyBagModel(req.params.id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'id Not Found or Deleted',null,null,400);
    }
    return (res,'Success Delete MyBag',result.rows[0]);
  });
};