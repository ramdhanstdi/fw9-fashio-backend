const db = require('../helpers/db');

exports.addMyBagModel=(id,data,cb)=>{
  const que = 'INSERT INTO bag (seller_id,product_id,user_id,details) VALUES ($1,$2,$3,$4) RETURNING*';
  const val = [data.seller_id,data.product_id,id,data.details];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.getMyBagModel=(id,cb)=>{
  const que = `SELECT bag.id,seller_id,product_id,details,user_id FROM bag JOIN profile_costumer ON bag.user_id=profile_costumer.costumer_id WHERE bag.user_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.deleteMyBagModel=(id,cb)=>{
  const que = `DELETE FROM bag WHERE id=${id} RETURNING*`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};