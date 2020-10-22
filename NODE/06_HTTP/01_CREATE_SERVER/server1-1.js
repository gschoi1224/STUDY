// listen 메서드에 콜백 함수를 넣는 대신, 다음과 같이 서버에 listening 이벤트 리스너를 붙여도 됨

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Bye Server!</p>');
});

server.listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error', (err) => {
    console.error(err);
});