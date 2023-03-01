const path = require("path");
const express = require("express");
const passport = require("passport");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/home.html"));
  // const html = fs.readFileSync(path.join(__dirname, "../public/views/home.html"), 'utf-8');
  // const homePage = html.replace('{{username}}', req.user.username);
  // res.send(homePage);
});

app.get("/post", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/post.html"));
});

app.get("/register", (req, res) => {
  if (req.user) res.redirect("/");

  res.sendFile(path.join(__dirname, "../public/views/register.html"));
});

app.get("/login", (req, res) => {
  if (req.user) res.redirect("/");
  res.sendFile(path.join(__dirname, "../public/views/login.html"));
});

module.exports = app;