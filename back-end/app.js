const mysql = require("mysql");
const express = require('express');
const path = require('path');

require('dotenv').config();
require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const articleRoutes = require('./routes/article.routes');
const commentRoutes =require('./routes/comment.routes.js');

// créer une application express
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;