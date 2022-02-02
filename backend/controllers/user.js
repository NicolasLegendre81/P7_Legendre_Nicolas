const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require ('fs');
const db = require ('../config/db');


exports.signup = (req, res, next) => {
     const email =[req.body.email];
    db.query(`SELECT * FROM users WHERE email='${email}'`,
    (err, results, rows) => {
        
        if (results.length > 0) {
            res.status(401).json({
                message: 'Vous avez déja un compte utilisateur.'
            });
        } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Ajout à la BDD
            db.query(`INSERT INTO users VALUES (NULL,'${req.body.nom}','${req.body.prenom}', '${email}', '${hash}', '${req.body.position_in_company}','0','NULL')`,
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json("erreur");
                    }
                    return res.status(201).json({
                        message: 'Votre compte utilisateur à bien été crée !'
                    });
                }
            );
        })
        .catch(error => res.status(500).json({
            error
        }));
    }
    });
};

exports.login = (req, res, next) => {
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
                        console.log(results)
                        res.status(200).json({
                            user_id: results[0].user_id,
                            
                            token: jwt.sign({
                                user_id: results[0].user_id
                            }, process.env.MY_TOKEN,
                             {expiresIn: '24h'})

                    });
                }
            })
        }else{
            res.status(404).json({message:'Votre profil utilisateur est introuvable.'})

        }
    });
};

exports.getUserProfile = (req,res,next) => {
    db.query(`SELECT * FROM users WHERE user_id=${req.params.id};`,(err,result) =>{
        if(err){
            return res.status(400).json({err});
        }if(result){
            return res.status(200).json(result)
        }

    }
    )};

exports.deleteUserProfile = (req,res,next) => {
    db.query(`DELETE FROM users WHERE user_id=${req.body.user_id};`,(err,result,fields) =>{
        if(err){
            return res.status(400).json({err});
        }
        return res.status(200).json(result)
        
    }
    )};
    exports.modifyProfile = (req,res,next) => {
        if (req.body.nom !=''){
            db.query(`UPDATE users SET nom=? WHERE user_id=${req.body.user_id}`,[req.body.nom],(err,res) =>{
                if (err) throw err;
            });
        }
        if(req.body.prenom !=''){
            db.query(`UPDATE users SET prenom=? WHERE user_id=${req.body.user_id}`,[req.body.prenom],(err,res) =>{
                if (err) throw err;
            });
        }
        if (req.body.email !=''){
            db.query(`UPDATE users SET email=? WHERE user_id=${req.body.user_id}`,[req.body.email],(err,res) =>{
                if (err) throw err;
            });
        }
        return res.status(200).json({messsage:'le profil à été modifié'})
        // if (req.body.password !=''){
        //     bcrypt.hash(req.body.password, 10)
        //     .then(hash =>{
        //         db.query(`UDATE users SET password=? WHERE user_id=${req.body.user_id}`,[hash],
        //         (err,res,field)=>{
        //             if(err){
        //                 return res.status(400).json({err});

        //         }
        //         return res.status(201).json({message:"Le mot de passe a été modifié"});
            

        //     })
            
        // });
        
        // }
    }