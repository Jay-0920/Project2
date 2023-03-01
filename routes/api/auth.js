const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../models/user");
const { comparePassword } = require('../../controllers/auth-controller');

dotenv.config({
    path: '../../.env',
});

const router = express.Router();
const { JWT_SECRET } = process.env;

router.post('/login', async (req, res) => {
    try {
        console.log('Login request received');
        const { email, password } = req.body;

        const userWithEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (!await comparePassword(password, userWithEmail.password)) {
            return res.status(400).json({ message: "Email or password does not match" });
        }

        const accessToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, JWT_SECRET);

        return res.status(200).json({ message: "login successful", token: accessToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;