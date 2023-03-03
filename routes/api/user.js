const express = require("express");
const User = require("../../models/user");

const { hashPassword } = require('../../controllers/auth-controller');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (existingUser) {
            return res.status(400).json({ message: "email already exists" });
        }

        const hashed = await hashPassword(password);

        const user = User.create({ username, email, password: hashed });

        return res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;