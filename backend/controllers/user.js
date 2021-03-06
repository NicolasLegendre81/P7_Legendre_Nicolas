const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require ('fs');
const db = require ('../config/db');

exports.signup = (req, res, next) => {
 try{
        const email =[req.body.email];
        db.query(`SELECT * FROM users WHERE email='${email}'`,(err, results, rows) => {       
            if (results.length > 0) {
                res.status(401).json({message: 'Vous avez déja un compte utilisateur.'});
            } else {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    //Ajout à la BDD
                    db.query(`INSERT INTO users VALUES 
                    (NULL,'${req.body.nom}','${req.body.prenom}', '${email}', '${hash}', '${req.body.position_in_company}','0',imageUrl)`,
                        (err, results, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json("erreur");
                        }
                        return res.status(201).json({message: 'Votre compte utilisateur à bien été crée !'});
                    });
                })
                .catch(error => res.status(500).json({message:"Un problème est survenu"}));
            }
        });
    }catch(error){console.error(error)}
};

exports.login = (req, res, next) => {
    try{
        const email =[req.body.email];
        db.query(`SELECT * FROM users WHERE email='${email}'`,
            (err, results, rows) => { 
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then(passwordvalid => {
                        if (!passwordvalid) {
                            res.status(401).json({
                                message: 'Mot de passe incorrect.'
                            });
                        }else{
                            console.log('logged')
                            res.status(200).json({
                                user:   results[0],
                                token: jwt.sign({
                                    user_id: results[0].user_id,
                                    isAdmin: results[0].Admin,
                                }, process.env.MY_TOKEN,
                                 {expiresIn: '24h'})
                            });
                        }
                    });
            }else{
                res.status(404).json({message:'Votre profil utilisateur est introuvable.'});}
        });
    }catch(error) {console.error(error)}
};

exports.getUserProfile = (req,res,next) => {
    try{
        db.query(`SELECT * FROM users WHERE user_id=${req.params.id}`,(err,result) =>{
            if(err){
                return res.status(400).json({err});
            }if(result){
                return res.status(200).json(result);
            }
        });
    }catch(error){console.error(error)}
};

exports.deleteUserProfile = (req,res,next) => {
    try{
        deleteUserPromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`DELETE FROM users WHERE user_id=${req.params.id}`,(err,result) =>{
                    if (err){return reject(err)}
                    else{return resolve(result)};                
                });
            });
        }
        deletePostPromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`DELETE FROM posts WHERE author_id=${req.params.id}`,(err,result) =>{
                    if(err){return reject(err)}
                    else{return resolve (result)};
                });
            });
        }
        deleteComsPromise = () =>{
            return new Promise((resolve,reject) =>{
                db.query(`DELETE FROM comments WHERE comment_Author_id=${req.params.id}`,(err,result) => {
                    if(err){return reject(err)}
                    else{return resolve (result)};
                });
            });
        }
        async function deleteUserThings () {
            const promise1= deleteUserPromise();
            const promise2= deletePostPromise();
            const promise3=deleteComsPromise();
            const promises =[promise1,promise2,promise3];    
            try{
                const result = await Promise.all(promises);  
                return res.status(201).json({result,message:"utilisateur supprimé"});
            } catch(error){
                console.log(error);
            }
        }
            deleteUserThings();
    }catch (error){console.error(error)}
};

exports.modifyProfile = (req,res,next) => {
    try{
        if (req.body.nom !=''){
                db.query(`UPDATE users 
                SET nom=? WHERE user_id=${req.params.id}`,[req.body.nom],(err,result) =>{
                if (err) {
                    throw err;
                }
                return res.status(200).json({message:'Votre nom a été modifié'})               
            });
        }
        if(req.body.prenom !=''){
                db.query(`UPDATE users 
                SET prenom=? WHERE user_id="${req.params.id}"`,[req.body.prenom],(err,result) =>{
                if (err) throw err;
                return res.status(200).json({message:'Votre prénom a été modifié'})
            });
        }
        if (req.body.email !=''){
                db.query(`UPDATE users 
                SET email=? WHERE user_id="${req.params.id}"`,[req.body.email],(err,result) =>{
                if (err) throw err;
                return res.status(200).json({message:'Votre Email a été modifié'})
            });
        }
        if (req.body.position_in_company !=""){
                db.query(`UPDATE users
                 SET position_in_company=? WHERE user_id="${req.params.id}"`,[req.body.position_in_company],(err,result) =>{
                     if (err) throw err;
                     return res.status(200).json({message:'Votre poste a été modifié'})
                 });
        }  
    }catch(error){console.error(error)}     
};

exports.modifyPassword = (req,res,next) =>{
    try{
     if (req.body.password !=''){
            bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                db.query(`UPDATE users 
                SET password=? WHERE user_id=${req.params.id}`,[hash],
                (err,result)=>{
                    if(err){
                        throw err;
                    }
                    return res.status(201).json({message:"Votre mot de passe a été modifié"})
            })   
        });
        }
    }catch(error){console.error(error)}       
};

exports.profilePic = (req, res, next) => {
    try{
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;       
            db.query(`SELECT imageUrl FROM users WHERE user_id = ${req.params.id}`,(err, result)=> {
                if (err) {
                    return res.status(500).json(err.message);}
                const filename = result[0].imageUrl.split("/images/")[1];
                if (filename !== "profilePic.jpg") {
                    fs.unlink(`images/${filename}`, () => {
                        db.query(`UPDATE users 
                        SET imageUrl ="${imageUrl}" WHERE user_id =${req.params.id}`, (err, result) => {
                            if (err) {
                                throw err;
                            };
                            return res.status(200).json({ message: "Utilisateur modifié !" });
                        });
                    });
                } else {
                    db.query(`UPDATE users 
                    SET imageUrl ="${imageUrl}" WHERE user_id =${req.params.id}`, (err, result) => {
                        if (err) {
                            throw err;
                        };
                        return res.status(200).json({ message: "Utilisateur modifié !" });
                    });      
                }
            });
        }
    }catch(error){console.error(error)}
};