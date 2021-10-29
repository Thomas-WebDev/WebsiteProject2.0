const mysql = require('mysql2');
require('dotenv').config();

var host = process.env.DBHOST;
var username = process.env.DBUSERNAME;
var database = process.env.DBDATABASE;
var password = process.env.DBPASSWORD;

const pool = mysql.createPool({
  host: host,
  user: username,
  database: database,
  password: password
});

module.exports = pool.promise();