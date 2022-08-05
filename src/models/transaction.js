const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllTransaction = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM transactions WHERE tracking_number LIKE '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      // console.log(err);
      cb(err, res.rows);
    }
  );
};

exports.countAllTransaction = (keyword, cb) => {
  db.query(
    `SELECT * FROM transactions WHERE tracking_number LIKE '%${keyword}%' `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getDetailTransaction = (id, cb) => {
  const q = 'SELECT * FROM transactions WHERE id=$1';
  const val = [id];

  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(err, res);
  });
};

exports.createTransaction = (data, cb) => {
  
  const q =
    'INSERT INTO transactions (status, order_number, tracking_number, quantity, total_amount, payment_method, product_id, details, seller_id, costumer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const val = [data.status, data.order_number, data.tracking_number, data.quantity, data.total_amount, data.payment_method, data.product_id, data.details, data.seller_id, data.costumer_id];

  db.query(q, val, (err, res) => {
    cb(res);
    // console.log(err);
  });
};

exports.updateTransaction = (id, data, cb) => {
//   console.log();
  let val = [id];

  const filtered = {};

  const objt = {
    
    status: data.status,
    order_number: data.order_number,
    tracking_number: data.tracking_number,
    quantity: data.quantity,
    total_amount: data.total_amount,
    payment_method:data.payment_method,
    product_id: data.product_id,
    details: data.details,
    seller_id: data.seller_id,
    costumer_id: data.costumer_id

  };

  for (let x in objt) {
    if (objt[x] !== null) {
      filtered[x] = objt[x];
      val.push(objt[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);

  const q = `UPDATE transactions SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err, res);
    }
  });
};

exports.deleteTransaction = (id, cb) => {
  const q = 'DELETE FROM transactions WHERE id=$1 RETURNING *';
  const val = [id];

  db.query(q, val, (err, res) => {
    // console.log(err);
    cb(err, res);
  });
};
