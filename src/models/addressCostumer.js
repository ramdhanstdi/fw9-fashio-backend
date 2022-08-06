const db = require('../helpers/db');

exports.createAddressCostumer = (costumer_id, data, cb)=>{
  const quer = 'INSERT INTO address_costumer (recepient_name, recepient_phone, address, city, postal_code, primary_address, place_name, costumer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const value = [data.recepient_name, data.recepient_phone, data.address, data.city, data.postal_code, data.primary_address, data.place_name, costumer_id];
  db.query(quer, value, (err, res)=>{
    console.log(value);
    if(res) {
      cb(err, res.rows);
    }else{
      cb(err);
    }
  });
};

exports.getAllAdressCostumer = (costumer_id, cb) => {
  console.log(costumer_id);
  const quer = 'SELECT * FROM address_costumer WHERE costumer_id=$1';
  const value = [costumer_id];
  db.query(quer, value, (err, res)=>{
    if(err){
      cb(err);
    }else{
      cb(err, res.rows);
    }
  });
};

exports.updateAddressCostumer = (id, data, cb)=>{
  let value = [id];

  const filter = {};
  const obj = {
    recepient_name: data.recepient_name, 
    recepient_phone: data.recepient_phone, 
    address: data.address, 
    city: data.city, 
    postal_code: data.postal_code, 
    primary_address: data.primary_address, 
    place_name: data.place_name
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
  const quer = `UPDATE address_costumer SET ${finalRes} WHERE id=$1 RETURNING *`;
  db.query(quer, value, (err, res)=>{
    if(err) {
      cb(err);
    }
    cb(err, res.rows);
  }) ;
};

exports.deleteAddressCostumer = (id, cb) => {
  const quer = 'DELETE FROM address_costumer WHERE id=$1 RETURNING *';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      cb(err);
    }
    cb(err, res.rows);
  });
};

exports.detailAddressCostumer = (id, cb) => {
  const quer = 'SELECT * FROM address_costumer WHERE id=$1';
  const value = [id];
  db.query(quer, value, (err, res)=>{
    if(err) {
      cb(err);
    }
    cb(err, res.rows);
  });
};
  
