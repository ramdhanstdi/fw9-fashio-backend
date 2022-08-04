const db = require('../helpers/db');
const {LIMIT_DATA } = process.env;

exports.createUsersSellerModel = (data, cb) => {
  const que = 'INSERT INTO users_seller (username, email, password, phone, store_name) VALUES ($1, $2, $3, $4, $5) RETURNING*';
  const val = [data.username, data.email, data.password, data.phone, data.store_name];
  db.query(que,val,(err,res)=>{
    if(res){
      cb(err,res);
    }else{
      cb(err);
    }
  });
};

exports.listUsersSellerModel = (searchBy, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) =>{
  const que = `SELECT * FROM users_seller WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};


exports.countUsersSellerModel = (searchBy, keyword, cb) =>{
  const que = `SELECT * FROM users_seller WHERE ${searchBy} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.getDetailUsersSellerModel = (id,cb) => {
  db.query(`SELECT * FROM users_seller WHERE id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.getUsersSellerByEmail = (email,cb) => {
  const que ='SELECT * FROM users WHERE email=$1';
  const value = [email];
  db.query(que,value,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.editUsersSellerModel = (id, data, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    username: data.username,
    email: data.email,
    password: data.password,
    phone: data.phone,
    store_name: data.store_name
  };
  for(let i in obj){
    if(obj[i]!==null){
      if(obj[i]!==undefined){
        filtered[i]=obj[i];
        value.push(obj[i]);
      }
    }
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+2}`);
  const que = `UPDATE users_seller SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteUsersSellerModel = (id, cb) =>{
  const que = 'DELETE FROM users_seller WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};