const mysql = require ('mysql2');
require('dotenv').config();
//connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    database: 'groupomaniacs',
    password:process.env.DB_PASSWORD
});
  db.connect(function(err) {
    if (err) {
      console.error('La connection à la base de donnée a echoué');
      return;
    }
   
    console.log('La connection a été établie avec succés ');
  });
  
module.exports = db;