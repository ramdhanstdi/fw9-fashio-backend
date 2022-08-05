const ratingModal = require('../models/usersRating');
const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standardResponse');

// exports.getAll = async (req, res) => {
//   const ratings = await ratingModal.getAllRating();
//   return res.json({
//     success: true,
//     message: 'List all rating',
//     results: ratings
//   });
// };

// exports.createRating = async (req, res) => {
//   const rating = await ratingModal.createRating(req.body);
//   return res.json({
//     success: true,
//     message: 'List all rating',
//     results: rating
//   });
// };

exports.create = (req, res) => {
  ratingModal.create(req.body, (err, results)=> {
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Create Success',results.rows[0]);
    }
  });
};

exports.read = (req, res) => {
  ratingModal.read((results)=>{
    return response(res,'Read Success',results);
  });
};

exports.edit = (req, res) => {
  ratingModal.edit(req.params.id,req.body, (err, results) => {
    if (err) {
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Profile updated', results.rows[0]);
  });
};

exports.delete = (req, res) => {
  ratingModal.delete(req.params.id, (err, results)=> {
    if(err){
      return errorResponse(err,res);
    }
    if(results.rowCount > 0){
      return response(res,'Delete Success',results.rows[0]);
    }
    return response(res,'ID not Found or Deleted',null,null,400);
  });
};