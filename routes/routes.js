var express = require("express");
var bodyParser = require("body-parser");

var db = require('../models/index');

var app = express();


//user's guess constructor
function Guess(name, causeofdeath, deathdate) {
  this.name = name;
  this.causeofdeath = causeofdeath;
  this.deathdate = deathdate;
}



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
	    
	    //?check against database to see if already exists. If false, proceed?
	    //?associate user ID to guess?
	    
	    //write guess to database
	    db.Celebrity.create({
			name: userguess.name,
			causeofdeath: userguess.causeofdeath,
			deathdate: userguess.deathdate
			}).then(function(guess) {
			res.json(guess);
			});
	    //redirect to page with user's guesses displayed


	}
});

module.exports
