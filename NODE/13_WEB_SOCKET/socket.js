/*
ws 사용
const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => { // 웹 소켓 연결 시
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        ws.on('message', (message) => { // 클라이언트로부터메시지 수신 시
            console.log(message);
        });
        ws.on('error', (error) => { // 에러 시
            console.error(error);
        });
        ws.on('close', () => { // 연결 종료 시
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
            console.log('ws.readyState', ws.readyState);
            console.log('ws.OPEN', ws.OPEN);
            if (ws.readyState === ws.OPEN) {
                ws.send('서버에서 클라이언트로 메시지를 보냅니다');
            }
        }, 3000);
    });
};
*/

const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

/*
체험
module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io' }); // 두번째 인수로 서버 설정 가능, path: 클라이언트가 접속할 경로

    io.on('connection', (socket) => { // 웹 소켓 연결 시
        const req = socket.request; // 요청 객체에 접근 // socket.request.res : 응답 객체에 접근
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip); // socket.id : 소켓 고유의 아이디
        socket.on('disconnect', () => { // 연결 종료 시
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) => { // 에러 시
            console.error(error);
        });
        socket.on('reply', (data) => { // 클라이언트로부터 메시지 수신 시
            console.log(data);
        });
        socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
            socket.emit('news', 'Hello Socket.IO'); // emit(이벤트 이름, 데이터) 이 메시지를 받기 위해서는 클라이언트에 news 이벤트 리스너를 만들어야함
        }, 3000);
    });
};
*/
let roomArr = new Array();
module.exports = (server, app, sessionMiddleware) => {
    // 이거 클라이언트 path랑 맞춰야됨 꼭!!
    const io = SocketIO(server, { path: '/socket.io' });
    // 라우터에서 io 객체를 쓸 수 있게 저장해둠 req.app.get('io')로 접속가능
    app.set('io', io);
    // Socket.IO에 네임스페이스를 부여하는 메서드
    const room = io.of('/room');
    const chat = io.of('/chat');
    // 미들웨어 장착, 모든 웹 소켓 연결 시마다 실행됨. 세션 미들웨어에 요청 객체, 응답객체, next 함수를 인수로 넣으면 socket.request.session 객체가 생성됨
    io.use((socket, next) => {
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
        sessionMiddleware(socket.request, socket.request.res, next);
        // socket.io 3버전에서 undefined 문제생김! 
    });

    /*
        3버전에서 작동 안하는 문제 해결법
        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
        chat.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
        chat.use(wrap(sessionMiddleware));
    */

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req;
        const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
        const myColor = req.session.color;

        socket.join(roomId);
        // socket.to(방 아이디) 메서드로 특정 방에 데이터를 보낼 수 있음. 
        socket.to(roomId).emit('join', {
            user: 'system',
            chat: `${req.session.color}님이 입장하셨습니다.`,
        });
        axios.post(`http://localhost:8005/room/${roomId}/chat`, {
            user: 'system',
            chat: `${req.session.color}님이 입장하셨습니다.`,
        });
        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속해제');
            socket.leave(roomId);

            const currentRoom = socket.adapter.rooms[roomId];
            const userCount = currentRoom ? currentRoom.length : 0;
            if (userCount === 0) { // 접속자가 0명이면 방 삭제
                const signedCookie = req.signedCookies['connect.sid'];
                console.log('singedCookie=', signedCookie);
                const connectSID = cookie.sign(signedCookie, process.env.COOKIE_SECRET);
                //const signedCookie = cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET); // 쿠키 저장이 잘 안 되는 듯?
                //const connectSID = `${signedCookie}`;
                // express-session에서 서명한 쿠키 앞에는 s:이 붙고, 실제로는 encodeURIComponent 함수가 실행되어 s%3A가 됨
                axios.delete(`http://localhost:8005/room/${roomId}`, {
                        headers: {
                            Cookie: `connect.sid=s%3A${connectSID}`,
                        }
                    })
                    .then(() => {
                        console.log('방 제거 요청 성공');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                socket.to(roomId).emit('exit', {
                    user: 'system',
                    chat: `${req.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
        /*
            라우터 거치지 않고 채팅 구현
            socket.to(data.room).emit(data);
        */
    });
};