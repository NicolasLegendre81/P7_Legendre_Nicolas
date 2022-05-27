const db = require ('../config/db');
const fs = require ('fs');


exports.getAllPosts = (req,res,next) =>{
    
        postPromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`SELECT nom,prenom,position_in_company,imageUrl,id_post,post,post_date,author_id,post_imageUrl 
                FROM users JOIN  posts WHERE author_id =user_id ORDER BY post_date DESC`,
                (err,result)=>{
                    if (err){return reject(err)}
                    else{return resolve(result);}
                    
                });
            });
        }
        sharePromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`SELECT * FROM partage JOIN posts ON posts.id_post=partage.id_post 
                JOIN users ON users.user_id=partage.user_id ORDER BY share_date DESC`,(err,result)=>{
                    if (err){return reject(err)}
                    else{return resolve (result);}
                });

            });
        };
        async function getShareNallPost () {
            const promise1= postPromise();
            const promise2= sharePromise();
            const promises =[promise1,promise2];
             
            try{
            const result = await Promise.all(promises);
             
            return res.status(201).json(result)
             
            } catch(error){
            console.log(error)
            }
            }
            getShareNallPost()

};
exports.getPostsUser = (req,res,next) => {
    userPostPromise = () =>{
        return new Promise((resolve,reject) =>{
            db.query(`SELECT * FROM posts JOIN
             (SELECT user_id,nom,prenom,position_in_company,imageUrl FROM users)
             AS userposts ON user_id=posts.author_id WHERE user_id =${req.params.id} 
             ORDER BY post_date DESC`,(error,result)=>{
                if (error){return reject(error)}
                else{return resolve(result);}

             });

        });
    }
    userSharePromise = () =>{
        return new Promise((resolve,reject) =>{
            db.query(`SELECT * FROM partage JOIN posts ON posts.id_post=partage.id_post 
            JOIN users ON users.user_id=partage.user_id WHERE users.user_id =${req.params.id} 
            ORDER BY share_date DESC`,(error,result)=>{
                if(error){return reject(error)}
                else{return resolve (result);}
            });
        });
    }
    async function getUserShareNUserPost () {
        const promise1= userPostPromise();
        const promise2= userSharePromise();
        const promises =[promise1,promise2];
        try{
            const result = await Promise.all(promises);
             
            return res.status(201).json(result)
        }catch(error){console.error(error)};
    
};
getUserShareNUserPost ()
}
exports.createPost = (req,res,next) => {
    try{
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    db.query (`INSERT INTO posts (post,author_id,post_imageUrl) 
    VALUES (?,?,?)`,[req.body.post,req.body.user_id,image],(err,result) =>{
        if (err){
            throw err
        }else{
            res.status(201).json({message :'Votre poste a été publié'});
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
                    if(err) {throw err;}
                    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" 
                    WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){throw err;}
                        return res.status(201).json({message:'Publication modifiée'})
                    })
                });
            }else{
                const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" 
                    WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){throw err;}
                        return res.status(201).json({message:'Publication modifiée'})
                    });   
            }
        });
    }else{
        db.query(`UPDATE posts SET post="${req.body.post}" 
        WHERE id_post=${req.params.id}`,(err,result) =>{
            if(err){throw err;}
            return res.status(201).json({message:'Publication modifiée'})
        });
    }
};
 

exports.deletePost = (req,res,next) => {
    try{
    db.query( `SELECT * FROM posts WHERE id_post = ${req.params.id}`, (err,result) =>{
        if (err){throw err;}
       if(result[0].imageUrl !=""){
        const filename = result[0].post_imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`,() =>{
            db.query(`DELETE FROM posts WHERE id_post = ${req.params.id}`,(err,result) =>{
                if (err){throw err;}
                return res.status(201).json({message:'La publication a été suppprimée'})
            });
        })
       }else{
        db.query(`DELETE FROM posts WHERE id_post = ${req.params.id}`,(err,result) =>{
            if (err){throw err;}
            return res.status(201).json({message:'La publication a été suppprimée'})
        });
       }
    });
    }catch(error){console.error(error)}
};
exports.sharePost = (req,res,next) => {
    try{
        db.query(`INSERT INTO partage (id_post,user_id)
         VALUES (?,?)`,[req.params.id,req.body.id],(err,result) =>{
            if (err){throw err;}
            return res.status(201).json({message:'Nouveau partage publié'})
        }
        );

    }catch(error){console.error(error)}

    };

