const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');
const db = require('../models');

const router = express.Router();

router.use((req, res, next) => { // 모든 템플릿 엔진에서 공통으로 사용하기 때문에 locals에 담음.
    res.locals.user = req.user;
    res.locals.follwerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/', async(req, res, next) => {
    try {
        const posts = await Post.findAll({ // 게시글 조회
            include: [{
                    model: User,
                    attribute: ['id', 'nick'], // 작성자의 아이디와 닉네임을 JOIN 해서 제공
                },
                {
                    model: User,
                    attribute: ['id'], // 비밀번호로 조회하는 것을 방지하기 위해
                    as: 'likers',
                }
            ],
            order: [
                ['createdAt', 'DESC'] // 최신순으로 정렬
            ],
        });
        posts.map(post => {
            post.likers = post.likers.map(l => l.id);
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/hashtag', async(req, res, next) => { // 해시태그로 조회하는 라우터
    const query = req.query.hashtag; // 쿼리스트링으로 해시태그 이름을 받음
    if (!query) { // 해시태그 값이 없는 경우에 메인페이지로 돌려보냄
        return res.redirect('');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } }); // DB에서 해당 해시태그를 검색
        let posts = [];
        if (hashtag) { // 해시태그가 있다면 시퀄라이즈에서 제공하는 getPosts 메서드로 모든 게시글을 가져옴. 
            posts = await hashtag.getPosts({
                include: [{ model: User, attribute: ['nick', 'id'] },
                    { model: User, as: 'likers', attribute: ['id'] }
                ]
            }); // 가져올 때는 작성자 정보를 합침.

        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts, // 조회 게시글만 main으로 보냄
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;