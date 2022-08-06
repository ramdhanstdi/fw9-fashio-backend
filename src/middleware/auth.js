const jwt = require('jsonwebtoken');
const response = require('../helpers/standardResponse');
//const {APP_SECRET} = process.env;

const auth = (req, res, next)=> {
  if(req.headers.authorization){
    const auth = req.headers.authorization;
    const prefix = 'Bearer';
    if(auth.startsWith(prefix)){
      const token = auth.slice(prefix.length+1, auth.length);
      try{
        const results = jwt.verify(token, process.env.APP_SECRET || 'D3f4uLt'); //sesuaikan dgn app_secreet masing masing
        req.authUser = results;
        next();
      }catch(e){
        return response(res, 'Token Expired', null, null, 401);
      }
    }
  }else{
    return response(res, 'Unautorized', null, null, 401);
  }
  
};

module.exports = auth;