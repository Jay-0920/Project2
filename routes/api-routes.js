const db = require("../models");

module.exports = function(app) {
  // GET route for getting all posts by zip code
  app.get("/api/post/:zip", function(req, res) {
    db.Post.findAll({
      // where: {
      //   zip: req.params.zip
      // }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // GET route for getting all posts by city, state, and zip code
  app.get("/api/post/:city/:state/:zip", function(req, res) {
    db.Post.findAll({
      where: {
        city: req.params.city,
        state: req.params.state,
        zip: req.params.zip
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/post/:zip", function(req, res) {
    db.Post.create({
      author: req.body.author,
      title: req.body.title,
      body: req.body.body
      // comments?
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts/:city/:state/:zip", function(req, res) {
    db.Post.create({
      author: req.body.author,
      title: req.body.title,
      body: req.body.body
      // comments?
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
