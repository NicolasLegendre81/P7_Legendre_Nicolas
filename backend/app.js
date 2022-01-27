const express = require ('express');

//const userRoute = require ('./routes/user');
// const postRoute = require('./routes/post');
const mysql = require ('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    database: 'groupomaniacs',
    password: process.env.DB_PASSWORD
  });
  connection.connect()
  
const app = express();
//middleware Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//app.use ('/api/auth',userRoute);
//app.use ('/api/auth',postRoute);
module.exports = app;