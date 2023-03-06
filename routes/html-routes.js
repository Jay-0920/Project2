const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/views/home.html'));
});

router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '../public/views/login.html'));
});

router.get('/register', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, '../public/views/register.html'));
})

module.exports = router;