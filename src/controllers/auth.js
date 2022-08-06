const response = require('../helpers/standardResponse');
const authModel = require('../models/auth');
const errResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.registerCostumer = (req, res)=>{
  req.body.pin = null;
  authModel.registerCostumer(req.body, (err, result) => {
    if(err){
      return errResponse(err, res);
    }
    authModel.createProfile(result[0].id, (err)=>{
      if(err){
        return errResponse(err, res);
      }
    });
    return response(res, 'Register succesfully', result);
  });
};

exports.loginCostumer = (req, res)=>{
  const {email, password} = req.body;
  authModel.getUserCostumerByEmail(email, (err, results) => {
    if(results.rows.length < 1){
      return response(res, 'User Not Found', null, null, 400);
    }
    const user = results.rows[0];
    bcrypt.compare(password, user.password)
      .then((cpRes)=>{
        if(cpRes){
          const token = jwt.sign({id: user.id}, APP_SECRET || 'D3f4uLt');
          return response(res, 'Login Success', {token});
        }
        return response(res, 'Check your email and pasword', null, null, 400);

      })
      .catch((e) => {
        console.log(e);
        return response(res, 'Check your email and pasword', null, null, 400);
      });
  });
};

