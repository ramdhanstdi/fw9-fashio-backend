const db = require('../helpers/db');
const {LIMIT_DATA} = process.env;

exports.createProductModel = (data,photo1,photo2,photo3,photo4,photo5,sellerId,cb) => {
  db.query('BEGIN',err=>{
    if(err){
      cb(err);
    }else{
      const queryProduct = 'INSERT INTO products (name_product, price, condition, description, rating, seller_id, photo1,photo2,photo3,photo4,photo5) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11) RETURNING*';
      const valuesProduct = [data.name_product,data.price,data.condition,data.description,data.rating,sellerId,photo1,photo2,photo3,photo4,photo5];
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

exports.editProductModel = (id,seller, data,photo1,photo2,photo3,photo4,photo5, cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    name_product:data.name_product,
    price:data.price,
    condition:data.condition,
    description:data.description,
    rating:data.rating,
    seller_id:seller,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5
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

//Show ALL Product from database
exports.showAllProductModel=(searchBy,keyword,orderBy,order,limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  const que = `SELECT * FROM products JOIN variant ON variant.product_id=products.id JOIN size ON size.variant_id=variant.id WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${orderBy} ${order} LIMIT $1 OFFSET $2`;
  const val = [limit,offset];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.countAllProductsModel=(searchBy,keyword,cb)=>{
  const que = `SELECT * FROM products JOIN variant ON variant.product_id=products.id JOIN size ON size.variant_id=variant.id WHERE ${searchBy} LIKE ${keyword}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res.rowCount);
    }
  });
};

//Show ALL Seller Product
exports.showProductModel=(id,searchBy,keyword,orderBy,order,limit=parseInt(LIMIT_DATA), offset=0,cb)=>{
  const que = `SELECT * FROM products JOIN variant ON variant.product_id=products.id JOIN size ON size.variant_id=variant.id WHERE ${searchBy} LIKE '%${keyword}%' AND seller_id=${id} ORDER BY ${orderBy} ${order} LIMIT $1 OFFSET $2`;
  const val = [limit,offset];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.countAllProductSellerModel=(id,searchBy,keyword,cb)=>{
  const que = `SELECT * FROM products JOIN variant ON variant.product_id=products.id JOIN size ON size.variant_id=variant.id WHERE ${searchBy} LIKE ${keyword} AND seller_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res.rowCount);
    }
  });
};

//For Adding Varian Products
exports.addVarianModel=(id,data,cb)=>{
  const que = 'INSERT INTO variant (color,product_id) VALUES($1,$2) RETURNING*';
  const val = [data.color,id];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.getSizeModel=(id,cb)=>{
  const que = `SELECT * FROM size WHERE variant_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.addSizeModel=(id,name,stock,cb)=>{
  const que = 'INSERT INTO size (name,stock,variant_id) VALUES($1,$2,$3) RETURNING*';
  const val = [name,stock,id];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.updateStock=(id,data,cb)=>{
  let value = [id];
  const filtered = {};
  const obj = {
    name:data.name,
    stock:data.stock
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
  const que = `UPDATE size SET ${resulting} WHERE variant_id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteProductModel = (id,cb) =>{
  const que = `DELETE FROM products WHERE id=${id} RETURNING*`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};