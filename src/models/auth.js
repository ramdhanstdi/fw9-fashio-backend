const db = require('../helpers/db.js');


exports.createRegister = (data,cb) =>{
  db.query('BEGIN', err=>{
    if(err){
      console.log(err);
      cb(err);}
    else{
      const queryUserCostumer = 'INSERT INTO users_costumer (username, email, password) VALUES ($1, $2, $3) RETURNING*';
      const valUser = [data.username, data.email, data.password];
      db.query(queryUserCostumer,valUser,(err,res)=>{
        if(err){
          cb(err);
        }else{
          const queryProfileCostumer = 'INSERT INTO profile_costumer (costumer_id) VALUES ($1)';
          const valProfile = [res.rows[0].id];
          db.query(queryProfileCostumer,valProfile,(err)=>{
            if(err){
              cb(err);
            }else{
              const queryMyBag = 'INSERT INTO bag (user_id) VALUES ($1)';
              db.query(queryMyBag, valProfile, (err, res)=>{
                if(err){
                  cb(err);
                }else{
                  cb(err,res);
                  db.query('COMMIT',err=>{
                    if(err){
                      console.log(err);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};


exports.getUserCostumerByEmail = (email, cb) => {
  const quer = 'SELECT * FROM users_costumer WHERE email=$1';
  const value = [email];
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  });
};

exports.getUserSellerByEmail = (email, cb) => {
  const quer = 'SELECT * FROM users_seller WHERE email=$1';
  const value = [email];
  db.query(quer, value, (err, res)=>{
    cb(err, res);
  });
};

exports.createRegisterSeller = (data,cb) =>{
  db.query('BEGIN', err=>{
    if(err){
      console.log(err);
      cb(err);}
    else{
      const queryUserCostumer = 'INSERT INTO users_seller (username, email, phone, store_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING*';
      const valUser = [data.username, data.email, data.phone, data.store_name, data.password];
      db.query(queryUserCostumer,valUser,(err,res)=>{
        if(err){
          cb(err);
        }else{
          const queryProfileSeller = 'INSERT INTO profile_store (seller_id) VALUES ($1)';
          const valProfile = [res.rows[0].id];
          db.query(queryProfileSeller,valProfile,(err)=>{
            if(err){
              cb(err);
            }else{
              cb(err,res);
              db.query('COMMIT',err=>{
                if(err){
                  console.log(err);
                }
              });
            }
          });
        }
      });
    }
  });
};



