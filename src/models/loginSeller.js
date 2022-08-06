const db = require('../helpers/db');

exports.getUsersSellerByEmail = (email,cb) => {
  const que ='SELECT * FROM users_seller WHERE email=$1';
  const value = [email];
  db.query(que,value,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.showProfileStoreModel=(id,cb)=>{
  db.query(`SELECT store_name,email,phone,description,photo FROM profile_store WHERE seller_id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};