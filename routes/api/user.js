const express = require("express");
const User = require("../../models/user");

const { hashPassword } = require('../../controllers/auth-controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: err.message });
        }
    })

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

router.route('/:id')
    .get(async (req, res) => {
        try {
            const response = await User.findByPk(req.params.id);
            if(!response) throw new Error('User not found');
            return res.status(200).json(response);

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })

module.exports = router;