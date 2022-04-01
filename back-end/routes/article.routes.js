const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller.js')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, articleController.getAllArticle);
router.get('/:id', auth, articleController.getOneArticle);
router.post('/', auth, multer, articleController.createArticle);
router.put('/:id', auth, articleController.updateArticle);
router.delete('/:id', auth, articleController.deleteArticle);


module.exports = router;