const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.MY_TOKEN);
    const userId = decodedToken.user_id;
    if (req.body.user_id && req.body.user_id !== userId) {
      throw 'userId invalide!';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('La requête est invalide!')
    });
  }
};