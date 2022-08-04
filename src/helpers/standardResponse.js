const response = (res, msg, results, infoPage, status=200) => {
  let success = true;
  
  if(status >= 400){
    success = false;
  }
    
  const data ={
    success,
    message: msg,
  };
  
  if(infoPage){
    data.infoPage = pageInfo;
  }
     
  if(results){
    data.result = results;
  }
  
  
  return res.status(status).json(data);
};
  
module.exports = response;
  
  