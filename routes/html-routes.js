// html-routes.js - this file offers a set of routes for sending users to the various html pages

// Dependencies

const path = require("path");

// Routes

module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

<<<<<<< HEAD
  // index route loads view.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
  });

  // cms route loads cms.html
  app.get("/cms", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
=======
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
>>>>>>> 79b5df16e53e4e4564ed68f4479aa7b2dcd4a14d
  });

  app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/displayAll.html"));
  });
};
