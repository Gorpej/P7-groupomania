const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    multipleStatements: true
  });
  
  mysqlConnection.connect((err) => {
    if (!err) {
      console.log("Connected mySql");
    } else {
      console.log("Connection Failed");
    }
  });
