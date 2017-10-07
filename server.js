var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

//Homepage loading
app.get("/", function(req, res) {
  // res.send("Welcome!")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//posting new celeb death guess
app.post("/add-guess", function(req, res) {
  var newguess = {
  	name: req.body.name,
  	cause: req.body.cause,
  	deathdate: req.body.deathdate
  }

  console.log(newguess);
  // check against database to see if already exists, if no add guess to database

  res.json(newguess);
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
