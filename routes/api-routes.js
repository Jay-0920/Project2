const db = require("../models");
const passport = require("../config/passport");

module.exports = app => {
  // POST ROUTES
  app.get("/api/post/:zip", async (req, res) => {
    try {
      const dbPost = await db.Post.findAll({ where: { location: req.params.zip } });
      res.json(dbPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/post/", async (req, res) => {
    try {
      const dbPost = await db.Post.findAll({});
      res.json(dbPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/post/", async (req, res) => {
    try {
      const post = await db.Post.create(req.body);
      return res.json(post);

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  // VOTE ROUTES
  app.get("/api/votes/:id", async (req, res) => {
    try {
      const dbPost = await db.Vote.findAll({
        where: { PostId: req.params.id },
        include: [db.Post]
      });
      res.json(dbPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/post/vote/:id", (req, res) => {
    console.log(req.User);
    db.Vote.create({
      author: req.User,
      PostId: req.params.id,
      vote: req.body.vote
    }).then(data => {
      res.json(data);
    });
  });

  // LOGIN ROUTES
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};