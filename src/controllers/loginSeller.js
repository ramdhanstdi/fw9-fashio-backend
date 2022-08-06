const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const loginUserModel = require('../models/loginSeller');
const profileSeller = require('../models/profileSeller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = (req,res) => {
  const {email,password} = req.body;

  loginUserModel.getUsersSellerByEmail(email,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    if(result.rowCount<1){
      return response(res,'Email Or Password Wrong',null,null,400);
    }
    const userSeller = result.rows[0];
    bcrypt.compare(password,userSeller.password)
      .then((comp)=>{
        if(comp){
          const token = jwt.sign({id: userSeller.id},process.env.APP_SECRET||'D3f4uLt');
          return response(res,'Login Success',token);
        }
        return response(res,'Email Or Password Wrong',null,null,400);
      })
      .catch(()=>{
        return response(res,'Email Or Password Wrong',null,null,400);
      });
  });
};

exports.editSeller = (req,res) => {
  const sellerId= req.authUser.id;
  let photo = null;
  req.files?photo=req.files[0].filename:photo=null;
  profileSeller.editProfileSellerModelbySeller(sellerId,photo,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Edit Profile Store Success', result.rows[0]);
    }
  });
};

exports.showStore = (req,res) => {
  const sellerId= req.authUser.id;
  loginUserModel.showProfileStoreModel(sellerId,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Showing', result.rows[0]);
    }
  });
};