// Dependencies
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("./config/passport");
const db = require("./models");

// Configure environment variables
dotenv.config();

// Create Express app
const PORT = process.env.PORT || 8000;
const app = express();

// Serve static content and parse incoming data
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use sessions to keep track of user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Import routes and give the server access to them
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Start server
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
