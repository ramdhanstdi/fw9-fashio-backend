const chats = require('express').Router();
const chatsController = require('../controllers/chat');
const auth = require('../middleware/auth');

chats.post('/chat',auth,chatsController.createChat);
chats.get('/chat',auth,chatsController.getHistoryChat);
chats.patch('/chat/:id',auth,chatsController.editChat);
chats.delete('/chat/:id',auth,chatsController.deleteChat);

module.exports=chats;
