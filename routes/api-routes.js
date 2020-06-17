const db = require("../models");

module.exports = app => {
  // GET route for getting all posts by zip code
  app.get("/api/post/:zip", (req, res) => {
    db.Post.findAll({
      where: {
        location: req.params.zip
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // GET route for getting all of the posts
  app.get("/api/post/", (req, res) => {
    db.Post.findAll({}).then(dbPost => {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/post/", (req, res) => {
    console.log(req.body);
    db.Post.create(req.body).then(dbPost => {
      res.json(dbPost);
    });
  });
};
