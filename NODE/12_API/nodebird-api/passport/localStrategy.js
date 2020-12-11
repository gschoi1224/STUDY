const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');
module.exports = () => {
    // 1. 전략에 관한 설정을 하는 곳
    passport.use(new localStrategy({
            usernameField: 'email', // 로그인 라우터의 req.body 속성명을 적으면 됨
            passwordField: 'password',
        },
        async(email, password, done) => { // 2. 실제 전략을 수행하는 async 함수 new localStrategy 생성자의 두 번째 인수 
            // 첫 번째 인수에서 넣어준 email과 password는 각각 async 함수의 첫 번째와 두 번째 매개변수가 됨.
            try {
                const exUser = await User.findOne({ where: { email } });
                console.log(exUser);
                if (exUser) {
                    const result = await bcrypt.compare(password, exUser.password);
                    if (result) {
                        done(null, exUser);
                    } else {
                        done(null, false, { message: '비밀번호가 일치하지 않습니다' });
                    }
                } else {
                    done(null, false, { message: '가입되지 않은 회원입니다.' });
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    ));
};
// 먼저 사용자 데이터베이스에서 일치하는 이메일이 있는지 찾은 후, 있다면 bcrypt의 compare 함수로 비밀번호를 비교함
// 비밀번호까지 일치한다면 done 함수의 두 번째 인수로 사용자 정보를 넣어 보냄
// 두 번째 인수를 사용하지 않는 경우는 로그인에 실패했을 경우 뿐
// done 함수의 첫 번째 인수를 사용하는 경우는 서버 쪽에서 에러가 발생했을 때고, 
// 세 번째 인수를 사용하는 경우는 로그인 처리 과정에서 비밀번호가 일치하지 않거나 존재하지 않는 회원일 때와 같은 사용자 정의 에러가 발생했을 때