const db = require('../helpers/db');

exports.costumerChatModel=(costumer,data,cb)=>{
  const que='INSERT INTO chats (costumer_id,seller_id,chat) VALUES ($1,$2,$3) RETURNING*';
  const val=[costumer,data.seller_id,data.chat];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.sellerChatModel=(seller,data,cb)=>{
  const que='INSERT INTO chats (seller_id,costumer_id,chat) VALUES ($1,$2,$3) RETURNING*';
  const val=[seller,data.costumer_id,data.chat];
  db.query(que,val,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.getHistoryChatModel=(id,cb)=>{
  const que=`SELECT chats.id,chats.seller_id,chats.costumer_id,chat,profile_costumer.full_name,profile_store.store_name FROM chats JOIN profile_costumer ON chats.costumer_id=profile_costumer.costumer_id JOIN profile_store ON profile_store.seller_id=chats.seller_id WHERE chats.seller_id=${id} OR chats.costumer_id=${id}`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};

exports.editChatModel = (id,data,cb) =>{
  let value = [id];
  const filtered = {};
  const obj = {
    chat:data.chat
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
  const que = `UPDATE chats SET ${resulting} WHERE id=$1 RETURNING*`;
  db.query(que,value,(err, res)=>{
    if(res){
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.deleteChatModel=(id,cb)=>{
  const que=`DELETE FROM chats WHERE id=${id} RETURNING*`;
  db.query(que,(err,res)=>{
    if(err){
      cb(err);
    }else{
      cb(err,res);
    }
  });
};