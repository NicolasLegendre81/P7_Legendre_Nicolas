const db = require ('../config/db');
const fs = require ('fs');

exports.getAllPosts = (req, res ,next) => {
    db.query('SELECT * FROM posts JOIN users WHERE user_id = author_id ORDER BY post_date DESC LIMIT 100',
    (err,result)=>{
        if (err) {
            console.log(err);
            return res.status(400).json("erreur");
        }
        else {res.status(200).json(result)}
    });
};
exports.createPost = (req,res,next) => {
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    db.query (`INSERT INTO posts (post,author_id,post_imageUrl) VALUES (?,?,?)`,[req.body.post,req.body.user_id,image],(err,result) =>{
        if (err){
            throw err
        }else{
            res.status(201).json({message :'Votre poste a été publié'})
        }    
    });
};

exports.modifyPost = (req,res,next) =>{
    if (req.file) {
        
        db.query(`SELECT * FROM posts WHERE id_post = ${req.params.id}`, (err, result) =>{
            if (err) res.status(400).json({ err });
            if (!result[0]) res.status(400).json({ message: "Aucun post ne correspond" });
            else {
                
                if (result[0].post_imageUrl != "") {
                    const filename = result[0].post_imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        if (err) {throw err;}
                        return res.status(200)('Image modifiée !');
                    });
                    
                }
                const image=(req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                db.query(`UPDATE posts SET post=${req.body.post}, post_imageUrl=${image}  WHERE id_post=${req.params.id_post}`,(err,res)=>{
                    if (err){throw err;}
                    return res.status(201).json({message:'La publication a été modifiée!'});
                });
            }
            
        });
    } else {
        db.query(`UPDATE posts SET post = '${req.body.post}' WHERE id_post = ${req.body.id_post}`, (error, result) => {
            if (error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);

        })
    }
};

exports.deletePost = (req,res,next) => {
    db.query( `SELECT * FROM posts WHERE id_post = ${req.body.id_post}`), (err,result) =>{
        if (err){throw err;}
       return res.status(200).json(result);
    }

};
