const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
port = process.env.PORT || 3000;

// const mysql = require("mysql");
// // connection configurations
// const mc = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "malama"
// });

//oil
var path = require("path");
var public = path.join(__dirname, "public");
app.get("/", function(req, res) {
  res.sendFile(path.join(public, "index.html"));
});

app.use("/", express.static(public));
//oil

// // connect to database
// mc.connect();

app.listen(port);

console.log("FRONTEND server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var routes = require("./app/routes/appRoutes.js"); //importing route
// routes(app); //register the route
