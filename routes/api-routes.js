const db = require("../models");

module.exports = function(app) {
  // GET route for getting all posts by zip code
  app.get("/api/post/:zip", function(req, res) {
    db.Post.findAll({
      where: {
        location: req.params.zip
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // GET route for getting all of the posts
  app.get("/api/post/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/post/", function(req, res) {
    console.log(req.body);
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
