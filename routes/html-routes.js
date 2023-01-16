const path = require("path");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/post", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the main page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the main page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
};