const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async(req, res, next) => { // 접속 시 로그인 화면을 보여줌
    try {
        const user = await User.findOne({
            where: { id: req.user && req.user.id || null }, // req.user ? req.user.id : null 과 같음
            include: { model: Domain },
        });
        console.log('!!!!!!!! ', user, ' !!!!!!!!!!!');
        res.render('login', {
            user,
            domains: user && user.Domains,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/domain', isLoggedIn, async(req, res, next) => { // 폼으로부터 온 데이터를 도메인 모델에 저장
    try {
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4(),
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;