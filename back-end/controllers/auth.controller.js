const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User.model.js')
const db = require('../config/db');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                user_lastName: req.body.lastName,
                user_firstName: req.body.firstName,
                user_email: req.body.email,
                user_password: hash
            }
            let sql = "INSERT INTO users (user_lastname, user_firstName, user_email, user_password) VALUES (?)";
            db.query(sql, user, function (error, result, fields) {
                if (error) {
                    throw error
                } else {
                    console.log(fields)
                    res.status(201).json({ message: 'Utilisateur créé !' });
                }
            });
        });
}