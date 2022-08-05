const db = require('../helpers/db');

exports.registerSellerModel=(data,cb)=>{
  db.query('BEGIN', err =>{
    if(err){
      cb(err);
    }else{
      const queryUser = 'INSERT INTO users_seller(username,email,password, phone, store_name) VALUES ($1, $2, $3, $4,$5) RETURNING*';
      const valUser = [data.username, data.email, data.password, data.phone, data.store_name];
      db.query(queryUser,valUser,(err,res)=>{
        if(err){
          cb(err);
        }else{
          const queryProfile = 'INSERT INTO profile_store (email, phone, store_name,seller_id) VALUES ($1, $2, $3, $4) RETURNING*';
          const valProfile = [data.email, data.phone, data.store_name, res.rows[0].id];
          db.query(queryProfile,valProfile,(err,res)=>{
            if(err){
              cb(err);
            }else{
              cb(err,res);
            }
            db.query('COMMIT',err=>{
              if(err){
                cb(err);
              }
            });
          });
        }
      });
    }
  });
};