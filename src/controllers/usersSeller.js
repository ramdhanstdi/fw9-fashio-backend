const { createUsersSellerModel, listUsersSellerModel, countUsersSellerModel, getDetailUsersSellerModel, editUsersSellerModel, deleteUsersSellerModel }= require('../models/usersSeller');
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

exports.getUsersSeller = (req,res) => {
  const {searchBy='username',search='',method='ASC',limit=parseInt(LIMIT_DATA), page=1} = req.query;
  const offset = (page-1) * limit;

  listUsersSellerModel(searchBy, search, method, limit, offset,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    const pageInfo = {};
    countUsersSellerModel(searchBy,search,(err,totalusers)=>{
      pageInfo.totalData = totalusers;
      pageInfo.totalPage = Math.ceil(totalusers/limit);
      pageInfo.curretPage = parseInt(page);
      pageInfo.nextPage = pageInfo.curretPage < pageInfo.totalPage? pageInfo.curretPage+1:null;
      pageInfo.prevPage = pageInfo.curretPage > 1 ? pageInfo.curretPage-1:null;
      return response(res,'User show',result.rows, pageInfo);
    });
  });
};

exports.getDetailUsersSeller = (req,res) => {
  const getId = req.params.id;  
  console.log(getId);
  if(getId){
    getDetailUsersSellerModel(getId,(err,result)=>{
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

exports.editUsersSeller = (req,res) => {
  editUsersSellerModel(req.params.id,req.body,(err,result)=>{
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
  deleteUsersSellerModel(req.params.id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    if(result.rowCount > 0){
      return response(res,'Delete Success',result.rows[0]);
    }
    return response(res,'ID not Found or Deleted',null,null,400);
  });
};