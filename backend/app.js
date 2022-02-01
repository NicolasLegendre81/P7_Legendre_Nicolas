const express = require ('express');
const db = require ('./config/db')
const bodyparser = require('body-parser');
const userRoute = require ('./routes/user');
  
const app = express();
//middleware Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use (bodyparser.json());


app.use ('/api/auth',userRoute);
//app.use ('/api/posts',postRoute);
module.exports = app;