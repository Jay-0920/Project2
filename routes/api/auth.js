const express = require("express");
const dotenv = require("dotenv");
const passport = require('passport');

dotenv.config({
    path: '../../.env',
});

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;
    return res.status(200).json({ message: "login successful", user: user });
});

router.delete('/logout', (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Could not find user' });
    };

    req.logout();
    return res.status(200).json({ message: "logout successful", user: user });
});


router.get('/profile', (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    return res.status(200).json({ message: "user found", user: user });
});

module.exports = router;