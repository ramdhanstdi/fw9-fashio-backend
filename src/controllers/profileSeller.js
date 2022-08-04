const { createProfileSellerModel, listProfileSellerModel, countProfileSellerModel, getDetailProfileSellerModel, editProfileSellerModel, deleteProfileSellerModel } = require('../models/profileSeller');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');
const {LIMIT_DATA } = process.env;

exports.createProfileSeller = (req,res) => {
  createProfileSellerModel(req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res, 'Crete Profile Successs', result.rows[0]);
  });
};

exports.getProfileSeller = (req,res) => {
  const {searchBy='store_name',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  listProfileSellerModel(searchBy, search, method, limit, offset,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    const pageInfo = {};
    countProfileSellerModel(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',result.rows, pageInfo);
    });
  });
};

exports.getDetailProfileSeller = (req,res) => {
  const getId = req.params.id;  
  console.log(getId);
  if(getId){
    getDetailProfileSellerModel(getId,(err,result)=>{
      console.log(result);
      if(err){
        return errorResponse(err,res);
      }
      if(result.rowCount > 0){
        return response(res,'Detail Users',result.rows[0]);
      }else{
        return response(res,'ID not Found',null,null, 400);
      }
    });
  }
};

exports.editProfileSeller = (req,res) => {
  editProfileSellerModel(req.params.id,req.body,(err,result)=>{
    if (err) {
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Edit User Seller Success', result.rows[0]);
    }
    return response (res, 'ID not Found', null, null, 400);
  });
};

exports.deleteUsersSeller = (req,res) => {
  deleteProfileSellerModel(req.params.id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Delete Success',result.rows[0]);
    }
    return response(res,'ID not Found or Deleted',null,null,400);
  });
};