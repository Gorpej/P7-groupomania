const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js')
const auth = require('../middleware/auth');

router.get('/', auth,userController.getAllUser);
router.get('/:id',auth, userController.infoUser);
router.put('/:id',auth, userController.updateUser);
router.delete('/:id',auth, userController.deleteUser);

module.exports = router;