
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

//unclear what these would do in this app...keeping for now
// require("./routes/apiRoutes")(app); 
// require("./routes/htmlRoutes")(app); 

//user's guess constructor
function Guess(name, causeofdeath, deathdate) {
  this.name = name;
  this.causeofdeath = causeofdeath;
  this.deathdate = deathdate;
}

//Homepage route
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

//posting new celeb death guess route
app.post("/add-guess", function(req, res) {
  
  //guess object 
  var userguess = new Guess(req.body.name, req.body.causeofdeath, req.body.deathdate);

  //validate form
  req.checkBody("name", "Enter a living celebrity's name").notEmpty();
  req.checkBody("causeofdeath", "Enter a prediction for cause of death").notEmpty();
  req.checkBody("deathdate", "Enter a valid future date.").notEmpty().isAfter();

  var errors = req.validationErrors();
  
  if (errors) {
    res.redirect('/');
  } 
	else {
	    console.log(userguess);
	    res.send('Great Success!');
	    //check against database to see if already exists. If false, proceed?
	    //associate user ID to guess?
	    //write guess to database

	    db.Celebrity.create({
			name: userguess.name,
			causeofdeath: userguess.causeofdeath,
			deathdate: userguess.deathdate
			}).then(function(guess) {
			// We have access to the new todo as an argument inside of the callback function
			res.json(guess);
			});
	    //redirect to page with users guesses displayed
	}
});

//app initilization
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
