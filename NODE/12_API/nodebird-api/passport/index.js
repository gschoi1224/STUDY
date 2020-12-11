const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
const myInfo = {};

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { // 라우터가 실행되기 전에 deserializeUser가 먼저 실행됨. 
        // user.id 를 db 조회 후 req.user로 바꾸는 작업을 함
        // 1 => {id : 1, name : zero, age : 25} -> req.user
        if (myInfo[id]) {
            done(null, myInfo[id]);
        } else {
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
                .then(user => {
                    myInfo[id] = user;
                    done(null, user);
                })
                .catch(err => done(err));
        }
    });
    local();
    kakao();
};

/*
    흐름 : 회원가입하면 auth 라우터에서 회원가입이 된다 => 이후 로그인을 클릭하면 로그인 라우터 실행
    => 로컬 전략 파일 실행 => 이후 콜백으로 done 실행됨 => 로그인 라우터에서 req.login이 실행됨. 
    => 이 때 serializeUser 실행(유저 정보 중에  아이디만 세션에 저장)

    로그인된 상태에서 요청을 보낸다면 .deserializeUser 실행 => 요청 올 때마다 매번 실행됨 (id를 통해 유저 정보를 복구하는 디비요청 발생)
    캐싱을 통해 비효율적인 요청(db요청 매번 하는 것)을 막음
*/