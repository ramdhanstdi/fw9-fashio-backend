const db = require('../helpers/db.js');

exports.registerCostumer = (data, cb)=>{
  const quer = 'INSERT INTO users_costumer(username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const value = [data.username, data.email, data.password];
  db.query(quer, value, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.createProfile = (id_user, cb)=>{
  console.log(id_user);
  const quer = 'INSERT INTO profile(id_user) VALUES ($1) RETURNING *';
  const value = [id_user];
  db.query(quer, value, (err, res)=>{
    if (res) {
      cb(err, res.rows);
    }else{
      cb(err);
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



