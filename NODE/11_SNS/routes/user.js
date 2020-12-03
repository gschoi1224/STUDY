const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const db = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async(req, res, next) => { // :id == req.params.id
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/notFollow', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            db.sequelize.models.Follow.destroy({ where: { followerId: req.user.id, followingId: req.params.id } });
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.put('/update', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            console.log(req.body);
            const result = await User.update({
                email: req.body.email,
                nick: req.body.nick
            }, {
                where: { id: user.id }
            });
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }

})

module.exports = router;