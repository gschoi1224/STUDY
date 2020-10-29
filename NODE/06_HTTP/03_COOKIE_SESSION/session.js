const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
}, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        console.log('원본 : ', expires);
        console.log('ToString : ', expires.toString());
        console.log('GMT :', expires.toGMTString());
        console.log('세션 설정 ', `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`);
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
        // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        } catch (err) {
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중중중');
});

// 서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통. 세션 아이디는 꼭 쿠키를 사용해 주고받지 않아도 됨