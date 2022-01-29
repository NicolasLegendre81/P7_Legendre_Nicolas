const express = require ('express');
const bodyparser = require('body-parser');

//const userRoute = require ('./routes/user');
// const postRoute = require('./routes/posts');
const mysql = require ('mysql2');
require('dotenv').config();
//connect to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    database: 'groupomaniacs',
    password: process.env.DB_PASSWORD
  });
  db.execute(function(err) {
    if (err) {
      console.error('La connection à la base de donnée a echoué');
      return;
    }
   
    console.log('La connection a été établie avec succés ');
  });
  
const app = express();
//middleware Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//app.use ('/api/auth',userRoute);
//app.use ('/api/posts',postRoute);
module.exports = app;