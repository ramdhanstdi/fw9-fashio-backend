const chatModel = require('../models/chat');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');

exports.createChat=(req,res)=>{
  const id= req.authUser.id;
  if(req.body.costumer_id){
    chatModel.sellerChatModel(id,req.body,(err,result)=>{
      if(err){
        return errorResponse(err,res);
      }
      return response(res,'Chat to Costumer Sent',result.rows[0]);
    });
  }else{
    chatModel.costumerChatModel(id,req.body,(err,result)=>{
      if(err){
        console.log(err);
        return errorResponse(err,res);
      }
      return response (res,'Chat to Seller Sent', result.rows[0]);
    });}
};

exports.getHistoryChat=(req,res)=>{
  const id= req.authUser.id;
  chatModel.getHistoryChatModel(id,(err,result)=>{
    if(err){
      console.log(err);
      return errorResponse(err,res);
    }
    return response(res,'Showing Chat',result.rows);
  });
};

exports.editChat=(req,res)=>{
  chatModel.editChatModel(req.params.id,req.body,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }
    return response(res,'Chat Edited',result.rows[0]);
  });
};

exports.deleteChat=(req,res)=>{
  chatModel.deleteChatModel(req.params.id,(err,result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res,'Chat Deleted',result.rows[0]);
    }
  });
};