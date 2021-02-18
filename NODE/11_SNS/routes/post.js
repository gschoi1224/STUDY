const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// AWS에 대한 설정
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const upload = multer({
    /*
    서버에 저장
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
    */
    // AWS S3 에 저장
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'cgs-nodebird', // 버킷명
        key(req, file, cb) { // 저장할 파일명, 버킷 내부에서 original 폴더 아래에 생성함
            cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    const originalUrl = req.file.location;
    const url = originalUrl.replace(/\original\//, '/thumb/');
    //res.json({ url: `/img/${req.file.filename}` }); // 서버에 저장
    // AWS S3 저장
    res.json({ url: req.file.location }); // S3 버킷 이미지 주소가 담겨 있음.
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