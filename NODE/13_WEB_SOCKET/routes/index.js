const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const rooms = await Room.find({});
        res.render('main', { rooms, title: 'GIF 채팅방' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/room', (req, res) => {
    res.render('room', { title: 'GIF 채팅방 생성' });
});

router.post('/room', async(req, res, next) => { // 채팅방 만들기
    try {
        const newRoom = await Room.create({
            title: req.body.title,
            max: req.body.max,
            owner: req.session.color,
            password: req.body.password,
        });
        const io = req.app.get('io'); // app.set('io', io) 로 저장했던 객체 가져오기
        io.of('/room').emit('newRoom', newRoom); // 네임스페이스가 따로 없는 경우에는 of('이름') 빼고 전체 클라이언트에 데이터 보낼 수 있음
        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/room/:id', async(req, res, next) => { // 채팅방을 렌더링하는 라우터
    try {
        const room = await Room.findOne({ _id: req.params.id });
        const io = req.app.get('io');
        if (!room) {
            return res.redirect(`/?error=존재하지 않는 방입니다.`);
        }
        if (room.password && room.password !== req.query.password) {
            return res.redirect(`/?error=비밀번호가 틀렸습니다.`);
        }
        const { rooms } = io.of('/chat').adapter; // 방 목록
        if (rooms && rooms[req.params.id] && room.max <= rooms[req.params.id].length) {
            return res.redirect('/?error=허용 인원을 초과했습니다.');
        }
        const chats = await Chat.find({ room: room._id }).sort('createdAt'); // 기존 채팅 내용 불러오기       
        const participants = rooms[req.params.id];
        console.log(participants);
        return res.render('chat', {
            room,
            title: room.title,
            chats,
            user: req.session.color,
            participants
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.delete('/room/:id', async(req, res, next) => {
    try {
        await Room.remove({ _id: req.params.id });
        await Chat.remove({ room: req.params.id });
        res.send('ok');
        setTimeout(() => {
            req.app.get('io').of('/room').emit('removeRoom', req.params.id);
        }, 2000); // 채팅방과 채팅 내역을 삭제한 후 2초 뒤에 웹 소켓으로 /room 네임 스페이스에 방이 삭제되었음을 알림
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/room/:id/chat', async(req, res, next) => {
    try {
        const chat = await Chat.create({
            room: req.params.id,
            user: req.body.user === 'system' ? 'system' : req.session.color,
            chat: req.body.chat,
        });
        if (req.body.user !== 'system') {
            req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat); // 같은 방에 들어 있는 소켓들에게 메시지 데이터를 전송
        }
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/room/:id/gif', upload.single('gif'), async(req, res, next) => {
    try {
        const chat = await Chat.create({
            room: req.params.id,
            user: req.session.color,
            gif: req.file.filename,
        });
        req.app.get('io').of('/chat').to(req.params.id).emit('chat', chat);
        res.send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;