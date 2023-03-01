const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./models");
const passport = require('./auth/middleware/passport');

const userRouter = require("./routes/api/user");
const authRouter = require("./routes/api/auth");
const postRouter = require("./routes/api/post");
const pagesRouter = require("./routes/html-routes");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// initialize Passport middleware
app.use(passport.initialize());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const handleRoutes = () => {
  app.use(pagesRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/post', postRouter);
}

app.listen((PORT), () => {
  handleRoutes();
  db.authenticate();
  console.log(`Listening on port ${PORT}`)
});