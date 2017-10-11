
//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var validator = require('express-validator');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(validator());

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
  // res.send("Welcome!")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


//posting new celeb death guess route
app.post("/add-guess", function(req, res) {
  
  //guess object 
  var userguess = new Guess(req.body.name, req.body.causeofdeath, req.body.deathdate);

  //validate form
  req.checkBody("name", "Enter a living celebrity's name").isEmpty();
  req.checkBody("causeofdeath", "Enter a prediction for cause of death").isEmpty();
  req.checkBody("deathdate", "Enter a valid future date.").isAfter();

  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    console.log(userguess);
  
  // needs function check against database to see if already exists. If false, add guess to database
	res.json(userguess);
  }  
});


//app initilization
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
