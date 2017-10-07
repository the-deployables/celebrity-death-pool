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

app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
