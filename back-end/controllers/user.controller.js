const db = require('../config/db');

exports.getAllUser = (req, res, next) => {
    const sql = 'SELECT user_id, user_lastName, user_firstName, user_email FROM users'
    db.query(sql, function (error, results) {
        if (!error) {
            res.status(200).json(results);
        } else {
            res.status(401).json({ error: 'Erreur utilisateur table users' });
        }
    });
}

exports.infoUser = (req, res, next) => {
    const sql = 'SELECT user_id, user_lastName,user_firstName, user_email FROM users WHERE user_id = ?';
    db.query(sql, [req.params.id], function (error, results) {
        if (!error) {
            res.status(200).json(results[0]);
        } else {
            res.status(401).json({ error: 'Erreur utilisateur table users' });
        }
    });
}

exports.updateUser = (req, res, next) => {
    const sql = "UPDATE users SET user_lastName=?, user_firstName=?, user_email =? WHERE user_id=?";
    db.query(sql, [req.body.user_lastName,
        req.body.user_firstName,
        req.body.user_email,
        req.body.user_bio,
        req.params.id],
        function (error, results) {
        if (!error) {
            res.status(200).json({message: 'modification profil executé'});
            console.log(results)
        } else {
            res.status(401).json({ error: 'Erreur utilisateur table users' });
        }
    });
}

exports.deleteUser = (req, res, next) => {
    const sql = "DELETE FROM users WHERE user_id=?;";;
    db.query(sql, [req.params.id],function (error, results) {
        if (!error) {
            res.status(200).json({message: 'profil supprimé'});
            console.log(results)
        } else {
            res.status(401).json({ error: 'Erreur utilisateur table users' });
        }
    });
}