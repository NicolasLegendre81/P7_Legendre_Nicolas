const fs = require ('fs');
const { resolve } = require('path');
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
    }catch(error){console.error[error]}

};
exports.getComs = (req,res,next) =>{
    try{
        db.query(`SELECT comment_id,comment_content,post_id, comment_date,user_id,nom,prenom,position_in_company,imageUrl
                FROM comments AS c
                INNER JOIN
                posts AS p
                ON c.post_id = p.id_post
                INNER JOIN
                users AS u
                ON c.comment_Author_id = u.user_id
                WHERE c.post_id=${req.params.id} 
                ORDER BY c.comment_date DESC`,(err,result) =>{
                if(err){
                     throw err
                }else{
                    return res.status(201).json(result);
                }
            });
    } catch (error){console.error(error)}
};
exports.deleteComs = (req,res,next) =>{
    try{
        db.query(`DELETE FROM comments WHERE comment_id = ${req.params.id}`,(err,result) => {
            if(err){
                throw err
            }else{
                return res.status(201).json(result);
            }
        });
    } catch (error){console.error(error)}
};
exports.modifyComs = (req,res,next) =>{
    try {
        db.query(`UPDATE comments SET comment_content = "${req.body.comment_content}" WHERE comment_id = ${req.params.id}`,(err,result) =>{
            if(err){
                throw err
            } else {
                return res.status(201).json(result)
            }
        });
    } catch (error) {console.error(error)}
};