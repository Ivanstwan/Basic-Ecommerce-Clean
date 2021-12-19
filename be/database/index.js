const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  port: process.env.DB_MYSQL_PORT,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.log(`error : ${err.message}`);
  }
  console.log(`Connected to MySQL Server`);
});

module.exports = { db };
