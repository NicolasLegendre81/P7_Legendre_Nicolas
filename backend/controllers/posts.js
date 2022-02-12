const db = require ('../config/db');
const fs = require ('fs');


exports.getAllPosts = (req, res ,next) => {
    try{
    db.query('SELECT * FROM posts JOIN users WHERE user_id = author_id ORDER BY post_date DESC LIMIT 100',
    (err,result)=>{
        if (err) {
            console.log(err);
            return res.status(400).json("erreur");
        }
        else {res.status(200).json(result)}
    });
    }catch(error){console.error(err)}
};

exports.createPost = (req,res,next) => {
    try{
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    db.query (`INSERT INTO posts (post,author_id,post_imageUrl) VALUES (?,?,?)`,[req.body.post,req.body.user_id,image],(err,result) =>{
        if (err){
            throw err
        }else{
            res.status(201).json({message :'Votre poste a été publié'});
        }    
    });
 }catch(error){console.error[err]}
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
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){throw err;}
                        return res.status(201).json({message:'Publication modifiée'})
                    })

                    console.log(req.body.post)

                });
            }else{
                const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                    db.query(`UPDATE posts SET post="${req.body.post}", post_imageUrl="${image}" WHERE id_post = ${req.params.id}`,(err,result) =>{
                        if(err){throw err;}
                        return res.status(201).json({message:'Publication modifiée'})
                    });   
            }
        });
    }else{
        db.query(`UPDATE posts SET post="${req.body.post}" WHERE id_post=${req.params.id}`,(err,result) =>{
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
    }catch(error){console.error(err)}
};
