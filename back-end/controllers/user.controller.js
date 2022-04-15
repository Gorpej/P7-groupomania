const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.getAllUser = (req, res, next) => {
    try {
        const sql = 'SELECT user_id, user_lastName, user_firstName, user_email FROM users'
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
        const sql = 'SELECT user_id, user_lastName,user_firstName, user_email FROM users WHERE user_id = ?';
        db.query(sql, [req.params.id], function (error, results) {
            if (!error) {
                res.status(200).json(results[0]);
            } else {
                res.status(401).json({ error: 'Erreur utilisateur table users' });
            }
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.updateUser = (req, res, next) => {
    try {
        if (res.locals.userId === parseInt(req.params.id)) {
            bcrypt.hash(req.body.user_password, 10)
                .then(hash => {
                    const user = [
                        [req.body.user_lastName],
                        [req.body.user_firstName],
                        [req.body.user_email],
                        [hash],
                        [req.params.id]
                    ];
                    const sql = "UPDATE users SET user_lastName=?, user_firstName=?, user_email =?,user_password=? ,user_avatar WHERE user_id=?";
                    db.query(sql, user, function (error, results) {
                        if (!error) {
                            res.status(200).json({ message: 'modification profil executé' });
                        } else {
                            res.status(401).json({ error: 'Erreur utilisateur table users' });
                        }
                    });
                });
        } else {
            res.status(401).json({ error: 'erreur d\'authentification, vous n\'avez pas les droits pour modifier ce profil' })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.deleteUser = (req, res, next) => {
    try {
        if (res.locals.userId === parseInt(req.params.id)) {
            const sql = "DELETE FROM users WHERE user_id=?;";;
            db.query(sql, [req.params.id], function (error, results) {
                if (!error) {
                    res.status(200).json({ message: 'profil supprimé' });
                    console.log(results)
                } else {
                    res.status(401).json({ error: 'Erreur utilisateur table users' });
                }
            });
        } else {
            res.status(401).json({ error: 'Erreur utilisateur, vous n\'avez pas les droit de supprimer ce profil' })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}