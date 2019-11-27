var mysql = require("mysql");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'admin',
    database : 'malama',
    dateStrings: true
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connect!");
});

module.exports = connection;