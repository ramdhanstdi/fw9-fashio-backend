const db = require('../helpers/db');

exports.showCostumerProfile = (id,cb) =>{
  const que = `SELECT full_name, picture,phone,gender,birth_date FROM profile_costumer WHERE costumer_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};