
//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var validator = require('express-validator');
var mysql = require('mysql');
var sequelize = require('sequelize');

var db = require("/models");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(validator());

app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

require("./routes/routes")(app); 

//app initilization
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
