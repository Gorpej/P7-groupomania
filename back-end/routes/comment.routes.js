const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller.js')
const auth = require('../middleware/auth');

router.get('/', auth, commentController.getAllComment);
router.post('/', auth, commentController.createComment);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);


module.exports = router;