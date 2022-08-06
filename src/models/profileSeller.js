const db = require('../helpers/db');
const {LIMIT_DATA } = process.env;

exports.createProfileSellerModel = (data, cb) => {
  const que = 'INSERT INTO profile_store (email, phone, store_name, description, photo, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
  const val = [data.email, data.phone, data.store_name, data.description, data.photo, data.seller_id];
  db.query(que,val,(err,res)=>{
    if(res){
      cb(err,res);
    }else{
      cb(err);
    }
  });
};

exports.listProfileSellerModel = (searchBy, keyword,method,limit=parseInt(LIMIT_DATA), offset=0,cb) =>{
  const que = `SELECT * FROM profile_store WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY id ${method} LIMIT $1 OFFSET $2`;
  const value = [limit,offset];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};

exports.countProfileSellerModel = (searchBy, keyword, cb) =>{
  const que = `SELECT * FROM profile_store WHERE ${searchBy} LIKE '%${keyword}%'`;
  db.query(que,(err,res)=>{
    cb(err,res.rowCount);
  });
};

exports.getDetailProfileSellerModel = (id,cb) => {
  db.query(`SELECT * FROM profile_store WHERE id=${id}`,(err,res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};


//For Admin
exports.editProfileSellerModel = (id, data, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    email:data.email, 
    phone:data.phone, 
    store_name:data.store_name, 
    description:data.description, 
    photo:data.photo, 
    seller_id:data.seller_id
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
  const que = `UPDATE profile_store SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

//For Seller
exports.editProfileSellerModelbySeller = (id, data, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    email:data.email, 
    phone:data.phone, 
    store_name:data.store_name, 
    description:data.description, 
    photo:data.photo, 
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
  const que = `UPDATE profile_store SET ${resulting} WHERE seller_id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteProfileSellerModel = (id, cb) =>{
  const que = 'DELETE FROM profile_store WHERE id=$1 RETURNING*';
  const value = [id];
  db.query(que,value,(err,res)=>{
    cb(err,res);
  });
};