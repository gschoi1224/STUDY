const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async(req, res, next) => {
    console.log(req.body);
    try {
        const comment = await Comment.create({
            commenter : req.body.id,
            comment : req.body.comment,
        });
        console.log(comment);
        const result = await Comment.populate(comment, { path : 'commenter' });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
.patch(async (req, res, next) => {
    try {
        const result = await Comment.update({   // 시퀄라이즈와 반대로 첫번째 인수가 어떤 다큐먼트를 수정할지를 나타내고, 두 번째 인수로 수정할 필드와 값이 들어있는 객체를 제공함.
            _id : req.params.id,
        }, {
            comment : req.body.comment,
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        const result = await Comment.remove({_id : req.params.id});
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;