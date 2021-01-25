const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

// 현재 테스트를 실행하기 전에 수행되는 코드
beforeAll(async() => {
    await sequelize.sync(); // 데이터베이스에 테이블 생성
});

describe('POST /join', () => { // 회원가입 테스트
    test('로그인 안 했으면 가입', (done) => {
        request(app)
            .post('/auth/join')
            .send({
                email: 'cgs@cgs.co.kr',
                nick: 'cgs',
                password: '1234',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

describe('POST /join', () => { // 로그인한 상태에서 회원가입을 시도하는 경우
    const agent = request.agent(app); //하나 이상의 요청에서 재사용할 수 있음

    beforeEach((done) => { // 로그인 먼저 시도
        agent
            .post('/auth/login')
            .send({
                email: 'cgs@cgs.co.kr',
                password: '1234',
            })
            .end(done);
    });

    test('이미 로그인했으면 redirect / ', (done) => {
        const message = encodeURIComponent('로그인한 상태입니다');
        agent
            .post('auth/join')
            .send({
                email: 'cgs@cgs.co.kr',
                nick: 'cgs',
                password: '1234',
            })
            .expect('Location', `/?error=${message}`)
            .expect(302, done);
    });
});


describe('POST /login', () => {
    test('가입되지 않은 회원', async(done) => {
        const message = encodeURIComponent('가입되지 않은 회원입니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'cgs@cgs.co.kr',
                password: '1234',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });


    test('로그인 수행', async(done) => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'cgs@cgs.co.kr',
                password: '1234',
            })
            .expect('Location', '/')
            .expect(302, done);
    });

    test('비밀번호 틀림', async(done) => {
        const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'cgs@cgs.co.kr',
                password: 'wrong',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
});

describe('GET /logout', () => {
    test('로그인되어 있지 않으면 403', async(done) => {
        request(app)
            .get('/auth/logout')
            .expect(403, done);
    });

    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'cgs@cgs.co.kr',
                password: '1234',
            })
            .end(done);
    });

    test('로그아웃 수행', async(done) => {
        agent
            .get('/auth/logout')
            .expect('Location', '/')
            .expect(302, done);
    });
});



// 테스트 후에 데이터베이스에 데이터가 남아 있으면 다음 테스트에 영향을 미칠 수도 있기 때문에 정리하는 코드 추가
afterAll(async() => {
    await sequelize.sync({ force: true }); // 테이블을 다시 만듦.
})