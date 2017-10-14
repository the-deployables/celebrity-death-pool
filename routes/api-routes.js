var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts/", function(req, res) {
    db.Celebrity.findAll({})
    .then(function(dbCeleb) {
      res.json(dbCeleb);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Celebrity.create({
      name: req.body.name,
      causeofdeath: req.body.causeofdeath,
      deathdate: req.body.deathdate
    })
    .then(function(dbCeleb) {
      res.json(dbCeleb);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Celebrity.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbCeleb) {
      res.json(dbCeleb);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbCeleb) {
      res.json(dbCeleb);
    });
  });
};
