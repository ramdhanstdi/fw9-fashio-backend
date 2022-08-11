const response = require('../helpers/standardResponse');
const errResponse = require('../helpers/errorResponse');
const addressCostumerModel = require('../models/addressCostumer');
const { validationResult } = require('express-validator');


exports.welcome = (req, res)=>{  
  addressCostumerModel.userById(req.authUser.id, (err, results)=>{
    const user = results.rows[0];
    console.log(user);
    return response(res, 'welcome', user.username); 
  });
};

exports.createAddressCostumer = (req, res)=>{
  const { id } = req.authUser;
  const  {primary_address = false} = req.body;
  console.log(primary_address);
  const valdation = validationResult(req);
  if(!valdation.isEmpty()){
    return response(res, 'Error occurd', valdation.array(), 400);
  }
  if (primary_address === 'false' || primary_address === undefined || primary_address === null || primary_address === '' || primary_address === false){
    addressCostumerModel.createAddressNew(id, req.body, (err, results)=>{
      if (err) {
        return errResponse(err, res);
      }else{
        return response(res, 'Create Address successfully', results[0]);
      }
    });
  }else{
    addressCostumerModel.createAddress(id, req.body, (err, results)=>{
      if (err) {
        return errResponse(err, res);
      }else{
        return response(res, 'Create Address successfully', results[0]);
      }
    });
  }
};


exports.getAllUserCostumer = (req, res)=>{
  const { id } = req.authUser;
  addressCostumerModel.getAllAdressCostumer(id, (err, results)=>{
    // console.log(results);
    if(results.length < 1){
      return res.redirect('/404');
    }else{
      return response(res, 'All address', results, null);
    }
    
  });
};

exports.updateAddressCostumer = (req, res)=>{
  const { id } = req.authUser;
  const id_user = parseInt(req.params.id);
  const  {primary_address} = req.body;
  // console.log(typeof id_user);
  // console.log(typeof id);
  
  //const valdation = validationResult(req);
  // if(!valdation.isEmpty()){
  //   return response(res, 'Error occurd', valdation.array(), 400);
  // }
  if ( primary_address === 'false'  || primary_address === false || primary_address === undefined || primary_address === null || primary_address === ''){
    addressCostumerModel.updateAddressNew(id, id_user, req.body, (err, results)=>{
      if (err) {
        return errResponse(err, res);
      }else{
        return response(res, 'Update Address successfully', results[0]);
      }
    });
  }else{
    addressCostumerModel.updateAddress(id, req.body, (err, results)=>{
      if (err) {
        return errResponse(err, res);
      }else{
        return response(res, 'Update Address successfully', results[0]);
      }
    });
  }
};

exports.deleteAddressCostumer = (req, res)=>{
  const {id} =req.params;
  addressCostumerModel.deleteAddressCostumer(id, (err, results)=>{
    if(results.length > 0){
      return response(res, 'Delete Address Costumer success', results);
    }else{
      return res.redirect('/404');
    }
  });
};

exports.detailAddressCostumer = (req, res)=>{
  const {id} = req.params;
  addressCostumerModel.detailAddressCostumer(id, (err, results)=>{
    if (err) {
      return errResponse(err, res);
    }
    if(results.length > 0 ){
      return response(res, 'Address Details', results); 
    }else{
      return res.redirect('/404');
    }
  });
};

exports.primaryAddCostumer = (req, res)=>{
  const {id} =req.params;
  addressCostumerModel.primaryAddCostumer(id, (err, results)=>{
    if(results.length > 0 ){
      return response(res, 'Address Details', results); 
    }else{
      return res.redirect('/404');
    }
  });
};

