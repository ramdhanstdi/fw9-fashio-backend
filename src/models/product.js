const db = require('../helpers/db');
const {LIMIT_DATA } = process.env;

exports.createProductModel = (data, cb) => {
  const que = 'INSERT INTO products (username, email, password, phone, store_name) VALUES ($1, $2, $3, $4, $5) RETURNING*';
  const val = [data.username, data.email, data.password, data.phone, data.store_name];
  db.query(que,val,(err,res)=>{
    if(res){
      cb(err,res);
    }else{
      cb(err);
    }
  });
};
