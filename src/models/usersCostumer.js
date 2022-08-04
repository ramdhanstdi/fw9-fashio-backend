const db = require('../helpers/db');

exports.createUserCostumer = (data, cb)=>{
    const quer = 'INSERT INTO users_costumer(username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const value = [data.username, data.email, data.password];
    db.query(quer, value, (err, res)=>{
      if(res) {
        cb(err, res.rows);
      }else{
        cb(err);
      }
    });
  };

  

  exports.getAllUserCostumer = (searchBy, keyword, limit=Number(DATA_LIMIT), offset=0, orderBy, sortType, cb) => {
    db.query(`SELECT * FROM users_costumer WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortType} LIMIT $1 OFFSET $2`,
      [limit, offset], (err, res) => {
        if(err) {
          cb(err)
        }
        cb(err, res.rows);
      });
  };
   
  exports.countAllUser = (searchBy, keyword, cb)=> {
    db.query(`SELECT * FROM users_costumer WHERE ${searchBy} LIKE '%${keyword}%' `, (err, res)=>{
      if(err){
        cb(err)
      }
      cb(err, res.rowCount);
      
    });
  };

  exports.updateUserCostumer = (id, data, cb)=>{
  let value = [id];
  const filter = {};
    
  const obj = {
    username: data.username,
    password: data.password,
    email: data.email,
  };

  for(let x in obj){
    if(obj[x]!==null){
      if(obj[x]!==undefined){
        filter[x] = obj[x];
        value.push(obj[x]);
      }
    }
  }

  const key = Object.keys(filter);
  const finalRes = key.map((o, ind) => `${o}=$${ind+2}`);
  const quer = `UPDATE users_costumer SET ${finalRes} WHERE id=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  }) ;
};

exports.deleteUserCostumer = (id, cb) => {
  const quer = 'DELETE FROM users_costumer WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    //console.log(res);
    if(err) {
      cb(err);
    }
    cb(err, res.rows);
  });
};
//console.log();

exports.detailUserCostumer = (id, cb) => {
  const quer = 'SELECT * FROM users_costumer WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      cb(err);
    }
    cb(err, res.rows);
  });
};