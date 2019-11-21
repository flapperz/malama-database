const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
port = process.env.PORT || 5000;

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'POST');
  // res.header('Access-Control-Allow-Methods', 'DELETE');
  // res.header('Access-Control-Allow-Headers', 'accept, content-type');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  next();
});

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'malama'
});

// connect to database
mc.connect();

app.listen(port);

console.log('THIS IS BACKEND');
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route
