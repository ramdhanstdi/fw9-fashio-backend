const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllProfile = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM profile_costumer WHERE full_name LIKE '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      // console.log(err);
      cb(err, res.rows);
    }
  );
};

exports.countAllProfile = (keyword, cb) => {
  db.query(
    `SELECT * FROM profile_costumer WHERE full_name LIKE '%${keyword}%' `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getDetailProfile = (id, cb) => {
  const q = 'SELECT * FROM profile_costumer WHERE id=$1';
  const val = [id];

  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(err, res);
  });
};

exports.createProfile = (data, cb) => {
  
  const q =
    'INSERT INTO profile_costumer (full_name, picture, phone, gender, birth_date, costumer_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.full_name, data.picture, data.phone, data.gender, data.birth_date, data.costumer_id];

  db.query(q, val, (err, res) => {
    cb(res);
    console.log(err);
  });
};

exports.updateProfile = (id, picture, data, cb) => {
  console.log();
  let val = [id];

  const filtered = {};

  const objt = {
    picture,
    full_name: data.full_name,
    phone: data.phone,
    gender: data.gender,
  };

  for (let x in objt) {
    if (objt[x] !== null) {
      filtered[x] = objt[x];
      val.push(objt[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);

  const q = `UPDATE profile_costumer SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err, res);
    }
  });
};

exports.deleteProfile = (id, cb) => {
  const q = 'DELETE FROM profile_costumer WHERE id=$1 RETURNING *';
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};
