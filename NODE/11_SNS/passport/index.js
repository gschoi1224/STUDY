const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { // 라우터가 실행되기 전에 deserializeUser가 먼저 실행됨. 
        User.findOne({
                where: { id },
                include: [{
                    model: User,
                    attribute: ['id', 'nick'], // 비밀번호로 조회하는 것을 방지하기 위해
                    as: 'Followers',
                }, {
                    model: User,
                    attribute: ['id', 'nick'],
                    as: 'Followings',
                }],
            })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
    kakao();
};