const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { ESRCH } = require('constants');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^s#]+/g); // ['#노드', '#익스프레스']
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => { // [fileOrCreate, fileOrCreate] 모두 실행
                    return Hashtag.findOrCreate({
                            where: { title: tag.slice(1).toLowerCase() }, // 데이터베이스에 해시태그가 존재하면 가져오고, 존재하지 않으면 생성한 후 가져옴
                        }) // 결괏값으로 [모델, 생성여부 반환]
                }),
            ); // result에 Hashtag 모델들이 담기게 됨
            await post.addHashtags(result.map(r => r[0])); // 모델만 추가
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/like/:postId', isLoggedIn, async(req, res, next) => {
    try {
        console.log(req.user.id);
        const user = await User.findOne({ where: { id: req.user.id } });
        console.log(user);
        const postId = req.params.postId;
        const post = await Post.findOne({ where: { id: postId } });
        if (user && post) {
            console.log(parseInt(user.id, 10));
            await post.addLikers(parseInt(user.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user or no post');
        }
    } catch (err) {
        console.error(err);
    }
});
router.delete('/like/:postId', isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const postId = req.params.postId;
        const post = await Post.findOne({ where: { id: postId } });
        if (user && post) {
            await post.removeLikers(parseInt(user.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user or no post');
        }
    } catch (err) {
        console.error(err);
    }
});
router.delete('/:postId', isLoggedIn, async(req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = Post.findOne({ where: { id: postId } });
        if (post) {
            const result = await Post.destroy({ where: { id: postId } });
            res.send('success');
        } else {
            res.status(404).send('no post');
        }
    } catch (err) {
        console.error(err);
    }
});
module.exports = router;