const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const articleController = require('../controllers/article.controller.js')

router.get('/', auth, articleController.getAllArticle);
router.get('/:id', auth, articleController.getOneArticle);
router.post('/', auth, multer, articleController.createArticle);
router.put('/:id', auth, multer, articleController.updateArticle);
router.delete('/:id', auth, articleController.deleteArticle);


module.exports = router;