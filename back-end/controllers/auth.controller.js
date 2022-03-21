const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// var mysql = require('mysql');
const mysqlConnection = require('../config/db');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                user_last_name: req.body.lastName,
                user_first_name: req.body.firstName,
                user_email: req.body.email,
                user_password: hash
            });
            const tbUser = mysqlConnection("SELECT * FROM user",function(err,result,fields){    
                if(err) throw err;
                console.log(result);
            });
           console.log(tbUser)
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// exports.login = (req, res, next) => {
//     //trouver l'utilisateur de la base donnée findOne est une fonction asynchrone
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign(
//                             { userId: user._id },
//                             'RANDOM_TOKEN_SECRET',
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };