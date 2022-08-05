const db = require('../helpers/db');
// const {LIMIT_DATA } = process.env;

// exports.createRatingModel = (data, cb) => {
//   const q = 'INSERT INTO rating (product_id, seller_id, photo, review, rating, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
//   const val = [data.product_id, data.seller_id, data.photo, data.review, data.rating, data.user_id];
//   db.query(q, val, (err, res) => {
//     if(res) {
//       cb(err, res);
//     } else {
//       cb(err);
//     }
//   });
// };

// exports.listReviewProduct = (id, method, rating, limit=parseInt(LIMIT_DATA), offset=0, cb) => {
//   const q = `SELECT * FROM rating WHERE product_id = ${id} AND rating = ${rating}  ORDER BY id ${method} LIMIT $1 OFFSET $2`;
//   const val = [limit, offset];
//   db.query(q, val, (err, res) => {
//     cb(err, res);
//   });
// };

// exports.countReviewProduct = () => {

// };

// const prisma = require('../helpers/prisma');

// exports.getAllRating = async () => {
//   const ratings = await prisma.rating.findMany();
//   return ratings;
// };

// exports.createRating = async (data) => {
//   const rating = await prisma.rating.create({
//     data
//   });
//   return rating;
// };


exports.create = (data, cb) => {
  const q = 'INSERT INTO rating (product_id, seller_id, photo, review, rating, costumer_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*';
  const val = [data.product_id, data.seller_id, data.photo, data.review, data.rating, data.costumer_id];
  db.query(q, val, (err,res) => {
    console.log(err);
    if(res){
      cb(err,res);
    }else{
      cb(err);
    }
  });
};

exports.read = (cb) => {
  db.query('SELECT * FROM rating', (err, res) => {
    console.log(err);
    cb(res.rows);
  });
};

exports.edit = (id, data, cb) => {
  let val = [id];
  const filtered = {};
  const obj = {
    product_id: data.product_id,
    seller_id: data.seller_id,
    photo: data.photo,
    review: data.review,
    rating: data.rating,
    costumer_id: data.costumer_id
  };
  for(let i in obj){
    if(obj[i]!==null){
      if(obj[i]!==undefined){
        filtered[i]=obj[i];
        val.push(obj[i]);
      }
    }
  }
  const key = Object.keys(filtered);
  const resulting = key.map((o,index)=>`${o}=$${index+2}`);
  const q = `UPDATE rating SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(q,val,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.delete = (id, cb) => {
  const val = [id];
  const q = 'DELETE FROM rating WHERE id=$1 RETURNING *';
  db.query(q, val, (err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};