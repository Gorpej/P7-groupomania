const db = require('../config/db');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.getAllUser = (req, res, next) => {
    try {
        const sql = 'SELECT user_id, user_lastName, user_firstName, user_email,user_avatar FROM users'
        db.query(sql, function (error, results) {
            if (!error) {
                res.status(200).json(results);
            } else {
                res.status(401).json({ error: 'Erreur utilisateur table users' });
            }
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.infoUser = (req, res, next) => {
    try {
        if (res.locals.userId === parseInt(req.params.id)) {
            const sql = 'SELECT user_id, user_lastName, user_firstName, user_email, user_avatar FROM users WHERE user_id = ?';
            db.query(sql, [req.params.id], function (error, results) {
                if (!error) {
                    console.log(results)
                    res.status(200).json(results[0]);
                } else {
                    res.status(401).json({ error: 'Erreur utilisateur table users' });
                }
            });
        } else {
            res.status(401).json({ error: 'erreur d\'authentification, vous n\'avez pas les droits pour modifier ce profil' })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.updateUser = (req, res, next) => {
    try {
        if (res.locals.userId === parseInt(req.params.id)) {
            if (req.file) {
                const sql = "UPDATE users SET user_lastName=?, user_firstName=?, user_avatar=? WHERE user_id=?";
                const user = [
                    req.body.user_lastName,
                    req.body.user_firstName,
                    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    req.params.id
                ]
                db.query(sql, user, function (error, results) {
                    if (!error) {
                        res.status(200).json({ message: 'modification profil executé' });
                    } else {
                        console.log(error)
                        res.status(401).json({ error: 'Erreur utilisateur table users' });
                    }

                });
            } else {
                const user = [
                    req.body.user_lastName,
                    req.body.user_firstName,
                    req.params.id
                ]
                const sql = "UPDATE users SET user_lastName=?, user_firstName=? WHERE user_id=?";
                db.query(sql, user, function (error, results) {
                    if (!error) {
                        res.status(200).json({ message: 'modification profil executé' });
                    } else {
                        console.log(error)
                        res.status(401).json({ error: 'Erreur utilisateur table users' });
                    }

                });
            }

        } else {
            res.status(401).json({ error: 'erreur d\'authentification, vous n\'avez pas les droits pour modifier ce profil' })
        }
    } catch (error) {
        res.status(500).json({ error });
        console.log(error)
    }
}

exports.deleteUser = (req, res, next) => {
    try {
        const selectImg = "SELECT user_avatar FROM users WHERE user_id=?";
        const sql = "DELETE FROM users WHERE user_id=?";
        db.query(selectImg, req.params.id, function (error, result) {
            if (!error) {
                const filename = result[0].user_avatar.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    db.query(sql, req.params.id, function (error, results) {
                        if (res.locals.userId === parseInt(req.params.id)) {

                            db.query(sql, [req.params.id], function (error, results) {
                                if (!error) {
                                    res.status(200).json({ message: 'profil supprimé' });
                                } else {
                                    res.status(401).json({ error: 'Erreur utilisateur table users' });
                                }
                            })
                        }
                    })
                });
            } else {
                res.status(401).json({ error: 'Erreur utilisateur, vous n\'avez pas les droit de supprimer ce profil' })
            }
        })
    } catch (error) {
        res.status(500).json({ error });
    }

    }