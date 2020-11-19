const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// 1 회원가입
router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } }); // 기존에 같은 이메일로 가입한 사용자가 있는지 체크
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); // 비밀번호 암호화
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(erro);
        return next(error);
    }
});

// 2. 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authentiocate('local', (authError, user, info) => { // 로컬 로그인 전략을 수행
        if (authError) { // 첫 번째 매개변수 값이 있다면 실패
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, loginError => { // req.login 메서드를 호출함. Passport는 req객체에 login과 lgout 메서드를 추가함. req.login은 passport.serializeUser를 호출. req.login에 제공하는 user 객체가 serializeUser로 넘어감
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next)를 붙임.
});

// 3. 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(); // req.user 객체를 제거
    req.session.destroy(); // req.session 객체의 내용을 제거
    res.redirect('/');
});

// 카카오
router.get('/kakao', passport.authenticate('kakao')); // 로그인 과정 시작

router.get('/kakao/callback', passport.authenticate('kakao', { // 로그인 성공 여부 결과를 받음
    failureRedirect: '/', // 로그인에 실패했을 떄 이동할 곳
}), (req, res) => { // 성공할시 수행할 미들웨어
    res.redirect('/');
});

module.exports = router;