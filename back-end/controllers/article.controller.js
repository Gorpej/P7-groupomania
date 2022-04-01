const db = require('../config/db');

exports.createArticle = (req, res, next) => {
    try {
        const article = [
            res.locals.userId,
            req.body.article_message,
        ]
        const sql = "INSERT INTO articles (article_userId, article_message) VALUES (?)";
        db.query(sql, [article], function (error, results) {
            if (!error) {
                res.status(200).json(results[0]);
                console.log('article créer');
            } else {
                res.status(401).json({ error: 'Erreur creation d\'article' });
                console.log(error)
            }
        });  
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.updateArticle = (req, res, next) => {
    try {
        const article = [
            req.body.article_message,
            req.params.id
        ]
        const sql = "UPDATE articles SET article_message=? WHERE article_id=?";
        db.query(sql, article, function (error, results) {
            if (!error) {
                res.status(200).json(results[0]);
                console.log('article modifié');
            } else {
                res.status(401).json({ error: 'Erreur dans la modification' });
                console.log(error)
            }
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.deleteArticle = (req, res, next) => {
    const sql = "DELETE FROM articles WHERE article_id=?;";
    db.query(sql, [req.params.id], function (error, results) {
        if (!error) {
            res.status(200).json({ message: 'article supprimé' });
        } else {
            res.status(401).json({ error: 'Erreur requete suppression d\'article' });
        }
    });
}

exports.getAllArticle = (req, res, next) => {
    const sql = 'SELECT article_id, article_userId, article_message, article_date FROM articles'
    db.query(sql, function (error, results) {
        if (!error) {
            res.status(200).json(results);
        } else {
            res.status(401).json({ error: 'Erreur BDD articles' });
        }
    });
}
exports.getOneArticle = (req, res, next) => {
    const sql = 'SELECT article_id, article_userId, article_message, article_date FROM articles WHERE article_id = ?';
    db.query(sql, [req.params.id], function (error, results) {
        if (!error) {
            console.log(results)
            res.status(200).json(results[0]);
        } else {
            res.status(401).json({ error: 'Erreur BDD articles' });
        }
    });
}