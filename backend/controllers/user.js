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
                        res.status(200).json({
                            userId: results[0].id,
                            
                            token: jwt.sign({
                                userId: results[0].id
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