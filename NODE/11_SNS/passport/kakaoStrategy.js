const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    // 1. 카카오 로그인에 대한 설정
    passport.use(new KakaoStrategy({
            clientID: process.env.KAKAO_ID, // 카카오에서 발급해주는 아이디. 노출되지 ㅇ낳아야 하므로 .env파일에
            callbackURL: '/auth/kakao/callback', // 카카오로부터 인증 결과를 받을 라우터 주소.
        },
        // 2. 카카오를 통해 회원가입한 사용자가 있는지 조회
        async(accessToken, refreshToken, profile, done) => {
            console.log('kakao profile', profile);
            try {
                const exUser = await User.findOne({
                    where: { snsId: profile.id, provider: 'kakao' },
                });
                if (exUser) {
                    done(null, exUser); //  이미 회원가입 되어있는 경우
                } else { // 3. 회원가입 진행
                    const newUser = await User.create({ // 카카오에서 인증 후 callbackURL에 적힌 주소로 accessToken, refreshToken, profile을 보내줌. profile에는 사용자 정보가 들어있음
                        email: profile._json && profile._json.kakao_account_email,
                        nuick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    });
                    done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }));
};