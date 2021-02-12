const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');

const { Good, Auction, User, sequelize } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    console.log(req.user);
    res.locals.user = req.user; // 중복으로 쓰지 않아도 되므로 좋음!
    next();
});

// 메인 화면 렌더링
router.get('/', async(req, res, next) => {
    try {
        const goods = await Good.findAll({ where: { SoldId: null } }); // 경매 진행중인 상품 목록 불러오기 (낙찰자의 아이디가 null)
        res.render('main', {
            title: 'NodeAuction',
            goods,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 회원가입 화면 렌더링
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeAuction',
    });
});

// 상품 등록 화면 렌더링
router.get('/good', isLoggedIn, (req, res) => {
    res.render('good', { title: '상품 등록 - NodeAuction' });
});

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uplaods폴더가 없어 uploads 폴더를 생성함');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/good', isLoggedIn, upload.single('img'), async(req, res, next) => {
    try {
        const { name, price } = req.body;
        await Good.create({
            OwnerId: req.user.id,
            name,
            img: req.file.filename,
            price,
        });
        const end = new Date();
        end.setDate(end.getDate() + 1); // 하루 뒤
        schedule.scheduleJob(end, async() => { // 일정 예약(실행될 시각, 해당 시각이 되었을 때 수행할 콜백 함수)
            const success = await Auction.findOne({
                where: { GoodId: good.id },
                order: [
                    ['bid', 'DESC']
                ],
            });
            await Good.update({ SoldId: success.UserId }, { where: { id: good.id } });
            await User.update({ // 낙찰자의 보유 자산을 낙찰 금액만큼 빼기
                money: sequelize.literal(`money - ${success.bid}`), // 시퀄라이즈에서 해당 컬럼의 숫자를 줄이는 방법 숫자를 늘리려면 +로
            }, {
                where: { id: success.UserId },
            });
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 상품과 기존 입찰 정보들을 불러온 뒤 렌더링
router.get('/good/:id', isLoggedIn, async(req, res, next) => {
    try {
        const [good, auction] = await Promise.all([
            Good.findOne({
                where: { id: req.params.id },
                include: {
                    model: User,
                    as: 'Owner', // Good모델과 User 모델은 현재 일대다 관계가 두 번 연결(Owner, Sold)되어 어떤 관계를 include할지 as 속성으로 밝혀야 함
                },
            }),
            Auction.findAll({
                where: { GoodId: req.params.id },
                include: { model: User },
                order: [
                    ['bid', 'ASC']
                ],
            }),
        ]);
        res.render('auction', {
            title: `${good.name} - NodeAuction`,
            good,
            auction,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 클라이언트로부터 받은 입찰 저오를 저장
router.post('/good/:id/bid', isLoggedIn, async(req, res, next) => {
    try {
        const { bid, msg } = req.body;
        const good = await Good.findOne({
            where: { id: req.params.id },
            include: { model: Auction },
            order: [
                [{ model: Auction }, 'bid', 'DESC']
            ],
        });
        if (good.price >= bid) {
            return res.statusCode(403).send('시작 가격보다 높게 입찰해야 합니다.');
        }
        if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
            return res.status(403).send('경매가 이미 종료되었습니다.');
        }
        if (good.Auctions[0] && good.Auctions[0].bid >= bid) {
            return res.status(403).send('이전 입찰가보다 높아야 합니다.');
        }
        const result = await Auction.create({
            bid,
            msg,
            UserId: req.user.id,
            GoodId: req.params.id,
        });
        // 실시간으로 입찰 내역 전송
        req.app.get('io').to(req.params.id).emit('bid', {
            bid: result.bid,
            msg: result.msg,
            nick: req.user.nick,
        });
        return res.send('ok');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// 낙찰자가 낙찰 내역을 볼 수 있는 곳
router.get('/list', async (req, res, next) => {
    try {
        const goods = await Good.findAll({
            where : { SoldId : req.user.id },
            include : { model : Auction },
            order : [[{ model : Auction }, 'bid', 'DESC']],
        });
        res.render('list', { title : '낙찰 목록 - NodeAuction', goods});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;