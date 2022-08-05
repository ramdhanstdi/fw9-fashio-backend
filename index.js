require('dotenv').config();

const {PORT: port} = process.env;
const express = require('express');
const db = require('./src/helpers/db');
const app = express();
const cors = require('cors');
global.__basepath = __dirname;

app.use(express.urlencoded({ extended: false }));
app.use('/public',express.static('assets'));
app.use(cors());

app.get('/',(req,res)=>{
  return res.json({
    success: true,
    message: 'backend is running'
  });
});

app.use('/',require('./src/routers'));

app.use('*',(req, res)=>{
  return res.status(404).json({
    success: false,
    message: 'Not Found'
  });
});

app.listen(port,()=>{
  console.log(`App running in port ${port}`);
});