var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testnode"
});

//create TABLE --->

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   /*Create a table named "customers":*/
//   var sql = "CREATE TABLE newcustomers (name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//Insert into table ---->

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   //Insert a record in the "customers" table:
//   var sql = "INSERT INTO newcustomers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

//read data   ----->

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM newcustomers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get('/users', (req, res) => {
    Users.find().then((users) => {
        res.send({
            users
        });
    }, (err) => {
        res.status(400).send(err);
    });
});
app.listen(9090, () => {
    console.log(`started at port: ${9090}`);
});
