const db = require("../models");

module.exports = function (app) {
  app.get("/api/posts/:zip", (req, res) => {
    db.Post.findAll({
      where: {
        zip: req.params.zip
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:city/:state/:zip", (req, res) => {
    db.Post.findAll({
      where: {
        city: req.params.city,
        state: req.params.state,
        zip: req.params.zip
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.post("/api/posts/:zip", (req, res) => {
    console.log(req.body);
    db.Post.create({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text
      // comments?
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.post("/api/posts/:city/:state/:zip", (req, res) => {
    db.Post.create({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text
      // comments?
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
