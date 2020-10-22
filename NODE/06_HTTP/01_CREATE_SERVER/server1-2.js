// 한 번에 여러 서버 실행하기
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>8080포트입니다</p>');
})
.listen(8080, () => {   // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>8081포트입니다.</p>');
})
.listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
});