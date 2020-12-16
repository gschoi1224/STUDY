const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

router.use(async(req, res, next) => { // 모든 라우터에 적용
    const domain = await Domain.findOne({
        where: { host: url.parse(req.get('origin')).host }, // 클라이언트의 도메인 req.get('origin')과 호스트가 일치하는 것이 있는지 검사. http나 https를 떼어낼 때는 url.parse 사용
    });
    if (domain) {
        cors({
            origin: req.get('origin'), // 허용할 도메인만 따로 적음. 여러 개의 도메인을 허용할 때는 배열로
            credentials: true, // 이 옵션을 활성화해야 다른 도메인 간에 쿠키가 공유됨.
            // withCredentials : true, // axios에서도 도메인이 다른데, 쿠키를 공유해야 하는 경우
        })(req, res, next);
    } else {
        next();
    }
});

router.post('/token', async(req, res) => {
    console.log('!!!!!!!!!/token');
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attributes: ['nick', 'id'],
            },
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요'
            });
        }
        console.log(domain);
        const token = jwt.sign({
            id: domain.User.id,
            nick: domain.User.nick,
            type: domain.type,
        }, process.env.JWT_SECRET, {
            expiresIn: '30m', // 30분
            issuer: 'nodebird',
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

router.get('/test', verifyToken, apiLimiter, (req, res) => {
    res.json(req.decoded);
});

router.get('/posts/my', verifyToken, apiLimiter, (req, res) => {
    Post.findAll({ where: { userId: req.decoded.id } })
        .then(posts => {
            console.log(posts);
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: '서버 에러',
            });
        });
});

router.get('/posts/hashtag/:title', verifyToken, apiLimiter, async(req, res) => {
    try {
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        if (!hashtag) {
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다',
            });
        }
        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/user/follows', verifyToken, apiLimiter, async(req, res, next) => {
    const { clientSecret } = req.body;
    try {
        const me = await User.findOne({
            attributes: ['email', 'nick'],
            where: { id: req.decoded.id },
            include: [{
                model: User,
                attributes: ['email', 'nick'], // 비밀번호로 조회하는 것을 방지하기 위해
                as: 'Followers',
            }, {
                model: User,
                attributes: ['email', 'nick'],
                as: 'Followings',
            }],
        });
        console.log('me', me);
        console.log('me.followers', me.Followers);
        console.log('me.followings', me.Followings);
        return res.json({
            code: 200,
            payload: {
                'followers': me.Followers,
                'followings': me.Followings,
            },
        });
    } catch (error) {
        console.error(error);
        return res.json({
            code: 500,
            message: '서버 에러',
        });
    }
});


module.exports = router;
// 토큰 유효 기간을 30분으로 늘림, 라우터에 사용량 제한 미들웨어를 추가