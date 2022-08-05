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
  const eres = handlingErr();
  if(eres == null){
    return response(res, 'Error', null, null, 400);  
  }
};

module.exports = errorResponse;