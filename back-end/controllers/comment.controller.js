const db = require('../config/db');

exports.createComment = (req, res, next) => {
    try {
        const comment = [
            res.locals.userId,
            req.body.comment_articleId,
            req.body.comment_message
        ]
        const sql = "INSERT INTO comments (comment_userId,comment_articleId, comment_message) VALUES (?)";
        db.query(sql, [comment], function (error, results) {
            if (!error) {
                res.status(200).json({ message: 'commentaire créer' });
                console.log('commentaire créer');
            } else {
                res.status(401).json({ error: 'Erreur creation commentaire' });
                console.log(error)
            }
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.updateComment = (req, res, next) => {
    try {
        if (res.locals.userId === parseInt(req.body.comment_userId)) {   
            const comment = [
                req.body.comment_message,
                req.body.comment_userId,
                req.params.id
            ]
            const sql = "UPDATE comments SET comment_message=?, comment_userId=?  WHERE comment_id=?";
            db.query(sql, comment, function (error, results) {
                if (!error) {
                    res.status(200).json({ message: 'Modification du commentaire effectué' });
                } else {
                    res.status(401).json({ error: 'Erreur dans la modification' });
                    console.log(error)
                }
            });
        } else {
            res.status(401).json({ error: 'erreur d\'authentification, vous n\'avez pas les droits pour modifier ce commentaire' })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.deleteComment = (req, res, next) => {
    const sql = "DELETE FROM comments WHERE comment_id=?;";
    db.query(sql, [req.params.id], function (error, results) {
        if (!error) {
            res.status(200).json({ message: 'commentaire supprimé' });
        } else {
            res.status(401).json({ error: 'Erreur requete suppression de commentaire' });
        }
    });
}

exports.getAllComment = (req, res, next) => {
   const sql= "SELECT comment_id, comment_userId, comment_message, comment_date FROM comments"
    // const sql = 'SELECT comment_articleId, article_id, comment_message, comment_userId FROM `comments`  JOIN `articles`  ON `comments`.`comment_articleId` = `article_id`'
    db.query(sql, function (error, results) {
        if (!error) {
            res.status(200).json(results);
        } else {
            res.status(401).json({ error: 'Erreur BDD comments' });
        }
    });
}