const mysql = require("mysql");

const db = mysql.createConnection({
  
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
 
});

db.connect((error) => {
  if (error) {
    console.log("Connection Failed");
  } else {
    console.log("Connected mySql");
  }
});

module.exports = db;