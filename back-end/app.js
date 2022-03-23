const mysql = require("mysql");
const express = require('express');
const path = require('path');

require('dotenv').config();
require('./config/db');

const userRoutes = require('./routes/user.routes');


// créer une application express
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes 
app.use('/', userRoutes);



module.exports = app;








