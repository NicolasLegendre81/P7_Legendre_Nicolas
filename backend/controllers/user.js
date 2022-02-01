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
            db.query(`INSERT INTO users VALUES (NULL,'${req.body.nom}','${req.body.prenom}', '${email}', '${hash}', '${req.body.position_in_company}','0')`,
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