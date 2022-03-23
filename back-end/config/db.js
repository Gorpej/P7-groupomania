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


// const mysql = require("mysql");

// let db = mysql.createConnection({
  
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASS,
 
// });

// db.connect();

// db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

// db.end();

// module.exports = db;