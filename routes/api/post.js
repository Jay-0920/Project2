const express = require('express');
const router = express.Router();
const Post = require('../../models/post.js');
const User = require('../../models/user.js');

router.route('/')
    .get(async (req, res) => {
        try {
            const posts = await Post.findAll()
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })
    .post(async (req, res) => {
        try {
            const { userId, title, body, location } = req.body;

            const user = await User.findByPk(userId);
            if (!user) throw new Error('User not found');

            const post = await Post.create({
                authorId: userId,
                title,
                body,
                location
            })
            return res.status(201).json(post);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })

router.route('/location/:zipCode')
    .get(async (req, res) => {
        try {
            const zipCode = req.params.zipCode;
            const posts = await Post.findAll({ where: { location: zipCode } });

            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })

module.exports = router;