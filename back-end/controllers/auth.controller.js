const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.signup = (req, res, next) => {
    db.query('SELECT user_email FROM users WHERE user_email = ?', [req.body.user_email], function (err, result) {
        if (result[0] != undefined) {
            res.status(401).json({ message: 'Votre compte existe déja' });
        } else {
            bcrypt.hash(req.body.user_password, 10)
                .then(hash => {
                    const user = [
                        [req.body.user_lastName],
                        [req.body.user_firstName],
                        [req.body.user_email],
                        [hash],
                    ];
                    let sql = 'INSERT INTO users (user_lastname, user_firstName, user_email, user_password) VALUES (?)';
                    db.query(sql, [user], function (error, result) {
                        if (error) {
                            res.status(400).json({ message: 'Création de compte échouée' });
                        } else {
                            res.status(201).json({ message: 'Création de compte confirmée' });
                        }
                    })
                })
                .catch(error => res.status(500).json({ error }));
        }
    })
};

exports.login = (req, res, next) => {
    try {
        const sql = 'SELECT user_id, user_email, user_password, user_admin,user_lastName, user_firstName FROM users WHERE user_email = ?';
        db.query(sql, [req.body.user_email], function (error, results, fields) {
            if (!results[0]) {
                res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
            else if (results[0].user_email === req.body.user_email) {
                bcrypt.compare(req.body.user_password, results[0].user_password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        }
                        res.status(200).json({
                            userId: results[0].user_id,
                            admin: results[0].user_admin,
                            token: jwt.sign(
                                {
                                    userId: results[0].user_id,
                                    admin: results[0].user_admin
                                },
                                process.env.TOKEN_SECRET,
                                { expiresIn: '24h' }
                            )
                        });
                    });
            } else {
                res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            }
        });
    }
    catch (error) {
        res.status(500).json({ error });
    };
};