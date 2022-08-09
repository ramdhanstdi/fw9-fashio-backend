const response = require('./standardResponse');
const handlingErr =(msg, param, location='body')=>[
  {
    msg,
    param,
    location
  }
];

const errorResponse = (err, res) => {
  
  if (err.code === '23505' && err.detail.includes('email')) {
    const eres = handlingErr('Email already exist', 'email');
    return response(res, 'Error', eres, null, 400);
  }     
  if (err.code === '23505' && err.detail.includes('username')) {
    const eres = handlingErr('Username already exist', 'username');
    return response(res, 'Error', eres, null, 400);
  } 
  if (err.code === '23505' && err.detail.includes('phone')) {
    const eres = handlingErr('Phone already used', 'phone');
    return response(res, 'Error', eres, null, 400);
  }
  if (err.code === '23505' && err.detail.includes('store_name')) {
    const eres = handlingErr('Store name already exist', 'store_name');
    return response(res, 'Error', eres, null, 400);
  }

  // rating
  if (err.code === '23503' && err.detail.includes('seller_id')) {
    const eres = handlingErr('seller not exist', 'seller_id');
    return response(res, 'Error', eres, null, 400);
  }
  if (err.code === '23503' && err.detail.includes('product_id')) {
    const eres = handlingErr('product not exist', 'product_id');
    return response(res, 'Error', eres, null, 400);
  }
  if (err.code === '23503' && err.detail.includes('costumer_id')) {
    const eres = handlingErr('product not exist', 'costumer_id');
    return response(res, 'Error', eres, null, 400);
  }
  // rating
  const eres = handlingErr();
  if(eres == null){
    return response(res, 'Error', null, null, 400);  
  }
};

module.exports = errorResponse;