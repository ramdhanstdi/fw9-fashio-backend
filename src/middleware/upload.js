const upload = require('../helpers/upload').single('picture');
const response = require('../helpers/standardResponse');

const uploadPicture = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return response(res, `Error ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports = uploadPicture;