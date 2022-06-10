const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization.split(' ')[1];
   jwt.verify(token, process.env.MY_TOKEN);
    next()  
  } catch {
    res.status(401).json({
      error: new Error('La requête est invalide!')
    });
  }
};