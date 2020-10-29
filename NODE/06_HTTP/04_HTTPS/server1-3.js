// https 모듈은 웹 서버에 SSL 암호화를 추가함. GET이나 POST 요청을 할 때 오가는 데이터를 암호화해서 중간에 다른 사람이 요청을 가로채더라도 내용을 확인할 수 없게 함.

const https = require('https');
const fs = require('fs');

https.createServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca : [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
.listen(443, () => {
    console.log('https 포트에서 서버 대기 중');
});