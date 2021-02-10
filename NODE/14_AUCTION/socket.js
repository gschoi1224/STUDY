const SocketIO = require('socket.io');

module.exports = (server, app) => {
    console.log('socket.js')
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    io.on('connection', (socket) => { // 웹 소켓 연결 시
        console.log('socket.js on connection');
        const req = socket.request;
        const { headers: { referer } } = req;
        console.log(`referer : ${referer}`);
        const roomId = referer.split('/')[referer.split('/').length - 1];
        console.log(`roomId : ${roomId}`);
        socket.join(roomId);
        socket.on('disconnect', () => {
            socket.leave(roomId);
        });
    });
};