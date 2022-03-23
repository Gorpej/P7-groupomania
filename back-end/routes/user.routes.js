    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/auth.controller.js')


    // router.post('/signup', authController.signup);
    router.post('/signup', authController.signup);

    module.exports = router;