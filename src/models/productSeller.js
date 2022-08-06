const db = require('../helpers/db');

exports.createProductModel = (data,sellerId,cb) => {
  db.query('BEGIN',err=>{
    if(err){
      cb(err);
    }else{
      const queryProduct = 'INSERT INTO products (name_product, price, condition, description, rating, seller_id, photo1,photo2,photo3,photo4,photo5) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) RETURNING*';
      const valuesProduct = [data.name_product,data.price,data.condition,data.description,data.rating,sellerId,data.photo1,data.photo2,data.photo3,data.photo4,data.photo5];
      db.query(queryProduct,valuesProduct,(err,respro)=>{
        if(err){
          cb(err);
        }else{
          const queryVariant = 'INSERT INTO variant (color,product_id) VALUES ($1,$2) RETURNING*';
          const valuesVariant = [data.color,respro.rows[0].id];
          db.query(queryVariant,valuesVariant,(err,resvar)=>{
            if(err){
              cb(err);
            }else{
              const querySize = 'INSERT INTO size (name, stock,variant_id) VALUES ($1,$2,$3) RETURNING*';
              const valuesSize = [data.name,data.stock,resvar.rows[0].id];
              db.query(querySize,valuesSize,(err,res)=>{
                if(err){
                  cb(err);
                }else{
                  const products = respro.rows[0];
                  const variant = resvar.rows[0];
                  const size = res.rows[0];
                  cb(err,{products,variant,size});
                  db.query('COMMIT',err=>{
                    if(err){
                      cb(err);
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

exports.editProductModel = (id,seller, data, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    name_product:data.name_product,
    price:data.price,
    condition:data.condition,
    description:data.description,
    rating:data.rating,
    seller_id:seller,
    photo1:data.photo1,
    photo2:data.photo2,
    photo3:data.photo3,
    photo4:data.photo4,
    photo5:data.photo5
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
  const que = `UPDATE products SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};