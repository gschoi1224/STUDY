const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8', 'Set-Cookie' : 'mycookie=test'});
    res.end('Hello cookie');
})
.listen(8083, () => {
    console.log('8083 포트에서 서버 대기 중');
});