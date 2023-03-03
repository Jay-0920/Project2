const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./models");
const passport = require('./auth/middleware/passport-config');
const session = require('express-session');

const userRouter = require("./routes/api/user");
const authRouter = require("./routes/api/auth");
const postRouter = require("./routes/api/post");
const pagesRouter = require("./routes/html-routes");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static("public"));

// initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pagesRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

const runServer = () => {
  db.authenticate();
  app.listen((PORT), () => {
    console.log(`Listening on port ${PORT}`)
  });
}

runServer();