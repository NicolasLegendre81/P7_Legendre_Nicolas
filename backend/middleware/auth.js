const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.MY_TOKEN);
    const userId = decodedToken.userId;
    req.userId={ userId}
    if (req.body.userId && req.body.userId !== userId) {
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