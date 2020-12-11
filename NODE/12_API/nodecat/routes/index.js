const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v2';

// 1. NodeBird API에 요청을 보내는 함수. 자주 재사용되므로 분리함
axios.defaults.headers.origin = 'http://localhost:4000'; // origin 헤더 추가. 어디서 요청을 보내는지 파악하기 위해 사ㅛㅇㅇ
const request = async(req, api) => {
    try {
        if (!req.session.jwt) { // 세션에 토큰이 없으면
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
        }
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt },
        }); // API 요청
    } catch (error) {
        console.log('response : ', error.response);
        console.log('response.status : ', error.response.status);
        console.log('같은지 : ', error.status === 419);
        if (error.response.status === 419) { // 토큰 만료 시 토큰 재발급 받기
            delete req.session.jwt;
            return request(req, api);
        } // 419 외의 다른 에러면
        return error.response;
    }
};

router.get('/test', async(req, res, next) => { // 토큰 테스트 라우터
    try {
        if (!req.session.jwt) { // 세션에 토큰이 없으면 토큰 발급 시도
            const tokenResult = await axios.post('http://localhost:8002/v1/token', {
                clientSecret: process.env.CLIENT_SECRET,
            });
            if (tokenResult.data && tokenResult.data.code === 200) { // 토큰 발급 성공
                req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
            } else { // 토큰 발급 실패
                return res.json(tokenResult.data); // 발급 실패 사유 응답
            }
        }
        // 발급받은 토큰 테스트
        const result = await axios.get('http://localhost:8002/v1/test', {
            headers: { authorization: req.session.jwt },
        });
        return res.json(result.data);
    } catch (err) {
        console.error(err);
        //if (err.response.status === 419) { // 토큰 만료 시 
        return res.json(err.response.data);
        //}
        //return next(err);
    }
});

// 2. API를 이용해 자신이 작성한 포스트를 JSON 형식으로 가져오는 라우터
router.get('/mypost', async(req, res, next) => {
    try {
        const result = await request(req, '/posts/my');
        console.log(result);
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 3. API를 사용해 해시태그를 검색하는 라우터
router.get('/search/:hashtag', async(req, res, next) => {
    try {
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        );
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/', (req, res) => {
    res.render('main', { key: process.env.CLIENT_SECRET });
});

router.get('/myFollows', async(req, res, next) => {
    try {
        const result = await request(
            req, '/user/follows',
        );
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


module.exports = router;