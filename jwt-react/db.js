var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'auth_db'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySql Connected!");
});


// CREATE TABLE Persons (
//   personid int NOT NULL AUTO_INCREMENT,
//   username varchar(255) NOT NULL,
//   password varchar(255) NOT NULL,
//   refresh_token varchar(255) NOT NULL,
//   PRIMARY KEY (personid)
// );
module.exports = con;