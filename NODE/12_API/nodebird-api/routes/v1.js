const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

router.use(deprecated); // v1으로 접근한 모든 요청에 deprecated 응답을 보냄

router.get('/posts/my', verifyToken, (req, res) => { // 내가 올린 포스트 가져오기
    Post.findAll({
            where: { userId: req.decoded.id }
        })
        .then((posts) => {
            console.log(posts);
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러',
            });
        });
});

router.get('/posts/hashtag/:title', verifyToken, async(req, res) => { // 해시태그 검색 결과를 가져옴
    try {
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        if (!hashtag) {
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다',
            });
        }
        console.log(hashtag);
        const posts = await hashtag.getPosts();
        console.log(posts);
        return res.json({
            code: 200,
            payload: posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.post('/token', async(req, res) => { // 토큰을 발급하는 라우터
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({ // 라우터에서 전달받은 클라이언트 비밀 키로 도메인이 등록된 것인지를 먼저 확인
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['nick', 'id'],
            },
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
            });
        }
        const token = jwt.sign({ // 토큰 발급
            id: domain.User.id,
            nick: domain.User.nick, // 첫 번째 인수 : 토큰의 내용. 사용자의 아이디와 닉네임을 넣음
        }, process.env.JWT_SECRET, { // 두 번째 인수 : 토큰의 비밀 키 (유출되면 안 됨)
            expiresIn: '1m', // 1분    // 세 번째 인수 : 토큰의 설정.
            issuer: 'nodebird', // 발급자
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/test', verifyToken, (req, res) => { // 사용자가 토큰을 테스트해볼 수 있는 라우터
    res.json(req.decoded);
});

module.exports = router;