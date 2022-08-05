const response = require('../helpers/standardResponse');
const userCostumerModel = require('../models/usersCostumer');
const { validationResult } = require('express-validator');
const errResponse = require('../helpers/errorResponse');

exports.createUserCostumer = (req, res)=>{
  //console.log();
   const valdation = validationResult(req);
    if(!valdation.isEmpty()){
      return response(res, 'Error occurd', valdation.array(), null, 400);
    }
    userCostumerModel.createUserCostumer(req.body, (err, results)=>{
      
      if (err) {
        return errResponse(err, res);
      }else{
        return response(res, 'Create User Costumer Successfully', results);
      }
    });
  };

const {DATA_LIMIT} = process.env; //default data limit 5

exports.getAllUserCostumer = (req, res)=>{
const {searchBy='username', search ='', limit=parseInt(DATA_LIMIT), page=1, orderBy ='id', sortType='ASC' } = req.query;
const offset = (page-1) * limit;

userCostumerModel.getAllUserCostumer(searchBy, search, limit, offset, orderBy, sortType, (err, results)=>{
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      const pageinfo = {};
      userCostumerModel.countAllUser(searchBy, search, (err, totalData) =>{
        pageinfo.totalData = totalData;
        pageinfo.totalPage = Math.ceil(totalData/limit);
        pageinfo.currPage = parseInt(page);
        pageinfo.nextPage = pageinfo.currPage < pageinfo.totalPage ? pageinfo.currPage + 1 : null;
        pageinfo.prevPage = pageinfo.currPage > 1 ? pageinfo.currPage -1 : null;

        return response(res, 'Get All Users success', results, pageinfo);
      });
    }
    
  });
};

exports.updateUserCostumer = (req, res)=>{
  const {id} = req.params;
  const valdation = validationResult(req);
  if(!valdation.isEmpty()){
    return response(res, 'Error occurd', valdation.array(), 400);
  }
  userCostumerModel.updateUserCostumer(id, req.body, (err, results)=>{
     if(results.length > 0 ){
      if(err) {
        return errResponse(err, res);
      } else {
        return response(res, 'Edit User Costumer Successfully', results[0]);
      }
    }else{
      return res.redirect('/404');
    }
  });
};

exports.deleteUserCostumer = (req, res)=>{
  const {id} =req.params;
  userCostumerModel.deleteUserCostumer(id, (err, results)=>{
     if(results.length > 0){
      return response(res, 'Delete Users Costumer success', results);
    }else{
      return res.redirect('/404');
    }
  });
};

exports.detailUserCostumer = (req, res)=>{
  const {id} =req.params;
  userCostumerModel.detailUserCostumer(id, (err, results)=>{
    if(results.length > 0 ){
      return response(res, 'User Details', results[0]); 
    }else{
      return res.redirect('/404');
    }
  });
};
  