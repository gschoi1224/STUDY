const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');
const { rawListeners } = require('../schemas/user');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
.post(async (req, res, next) => {
    try {
        const user = await User.create({
            name : req.body.name,
            age : req.body.age,
            married : req.body.married,
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.find({ commenter : req.params.id })
        .populate('commenter');     // 관련 있는 컬렉션의 다큐먼트를 불러올 수 있음 commenter 필드의 ref가 User로 되어있으므로 알아서 users 컬렉션에서 사용자 다큐먼트를 찾아 합침.
                                    // 이제 commenter 필드는 ObjectId가 아니라 그 ObjectId를 가진 사용자 다큐먼트가 됨.
        console.log(comments, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        res.status(201).json(comments);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;