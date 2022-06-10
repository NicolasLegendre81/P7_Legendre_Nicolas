const db = require ('../config/db');
const fs = require ('fs');

exports.getAllPosts = (req,res,next) =>{
        db.query(`SELECT user_id,nom,prenom,position_in_company,imageUrl,id_post,post,post_date,author_id,post_imageUrl 
        FROM users JOIN posts WHERE posts.author_id=users.user_id  ORDER BY posts.post_date DESC`,
            (error,result)=>{
            if (error){
                throw error
            }
            else{return res.status(201).json(result);}         
        });             
};
exports.getPostsUser = (req,res,next) => {
    db.query(`SELECT * FROM posts JOIN
        (SELECT user_id,nom,prenom,position_in_company,imageUrl FROM users)
        AS userposts ON user_id=posts.author_id WHERE user_id =${req.params.id} 
        ORDER BY post_date DESC`,(error,result)=>{
        if (error){
            throw error
        }
        else{return res.status(201).json(result);}

    });
};
   
exports.createPost = (req,res,next) => {
    try{
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    db.query (`INSERT INTO posts (post,author_id,post_imageUrl) 
    VALUES (?,?,?)`,[req.body.post,req.body.user_id,image],(err,result) =>{
        if (err){
            throw err
        }else{
            res.status(201).json({message :'Votre publication a été publié'});
        }    
    });
 }catch(error){console.error[error]}
};

exports.modifyPost = (req,res,next) =>{   
    if (req.file){
        db.query(`SELECT * FROM posts WHERE id_post = ${req.params.id}`, (err, result) =>{
            if(err) res.status(400).json ({err});
            if (result[0].post_imageUrl !=""){
                const filename = result[0].post_imageUrl.split('/images/')[1];
                fs.unlink (`images/${filename}`,()=>{
                    if(err) {
                        throw err;
                    }
                    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" 
                    WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){
                            throw err;
                        }
                        return res.status(201).json({message:'Publication modifiée'})
                    })
                });
            }else{
                const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" 
                    WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){
                            throw err;
                        }
                        return res.status(201).json({message:'Publication modifiée'})
                    });   
            }
        });
    }else{
        db.query(`UPDATE posts SET post="${req.body.post}" 
        WHERE id_post=${req.params.id}`,(err,result) =>{
            if(err){
                throw err;
            }
            return res.status(201).json({message:'Publication modifiée'})
        });
    }
};
 
exports.deletePost = (req,res,next) => {
        postDeletePromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`DELETE FROM posts WHERE id_post = ${req.params.id}`,(error,result) => {
                    if (error){
                        return reject(error)
                    }
                    else{
                        return resolve(result)
                    };
                });
            });
        }
        comsDeletePromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`DELETE FROM comments WHERE post_id = ${req.params.id}`,(error,result) =>{
                    if (error){
                        return reject (error)
                    }
                    else{
                         return resolve (result)
                        };
                });
            });
        }
        async function deletePostsThings (){
            const promise1 = postDeletePromise();
            const promise2 = comsDeletePromise();
            const promise = [promise1,promise2];
            try{
                const result = await Promise.all(promise);  
                return res.status(201).json({result,message:"Publication supprimée"});
            } catch(error){
                console.log(error);
            }
        } 
        deletePostsThings ()       
};


