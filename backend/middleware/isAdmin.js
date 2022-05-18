const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
   const decodedToken=jwt.verify(token, process.env.MY_TOKEN);
   console.log(decodedToken)
   if(decodedToken.isAdmin){
       next()
   }else{
       res.status(401).json({error:"L'utilisateur n'est pas autorisé"})
   }

    
    
  } catch {
    res.status(401).json({
      error: new Error('La requête est invalide!')
    });
  }
};