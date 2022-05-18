const fs = require ('fs');
const db = require ('../config/db');


exports.createCom=(req,res,next) =>{
    try{
        db.query(`INSERT INTO comments (comment_content,post_id,comment_author_id) VALUES (?,?,?)`,
        [req.body.comment_content,req.body.post_id,req.body.user_id],(err,result) =>{
        if (err){
            throw err
        }else{
            res.status(201).json({message :'Votre commentaire a été publié'});
        }
        });    
    }catch(error){console.error[err]}

};
// exports.getComs = (req,res,next) =>{
    
//     getComsPromise = () =>{
//         return new Promise((resolve,reject) =>{
//             db.query(`SELECT * FROM comments JOIN posts ON posts.id_post=comments.post-id`,
//             (err,result)=>{
//                 if (err){return reject(error)}
//                 else{return resolve(result);}
                
//             });
//         });
//     }
// }