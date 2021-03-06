const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        res.locals.userId = userId;
        res.locals.admin = admin;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}