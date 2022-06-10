const jwt = require ('jsonwebtoken');
const db = require ('../config/db');
module.exports = (req,res,next) =>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.MY_TOKEN);
    const user_id = decodedToken.user_id;
    db.query(`SELECT user_id FROM users INNER JOIN posts ON author_id = users.user_id  WHERE id_post=${req.params.id}`,(err,result) =>{
        if ((result[0].user_id === user_id||decodedToken.isAdmin)){ next();
        }else{
            res.status(401).json({ message:'Vous ne pouvez pas modifier cette publication'});
        } 
    });
};