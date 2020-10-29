const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 1.
const parseCookies = (cookie = '') => 
    cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
}, {});
// 문자열을 객체로 바꿔줌

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(cookies.name);
    // 2. 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        console.log('req.url :', req.url);  //req.url : /login?name=%EC%88%98%EB%B0%95
        const { name } = qs.parse(query);   
        console.log('query :', query);      //query : name=%EC%88%98%EB%B0%95
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,

            /*
                한글과 줄바꿈은 들어가면 안됨
                쿠키명=쿠키값 : 기본적인 쿠키의 값
                Expires=날짜 : 만료 기한. 이 기한이 지나면 쿠키가 제거됨. 기본값은 클라이언트가 종료될 때까지
                Max-age=초 : Expires와 비슷하지만 날자 대신 초를 입력할 수 있음. 초가 지나면 쿠키가 제거됨. Expires보다 우선시됨
                Domain=도메인명 : 쿠키가 전송될 도메인을 특정할 수 있음. 기본값은 현재 도메인
                Path=URL : 쿠키가 전송될 URL을 특정할 수 있음. 기본값은 '/'이고 이 경우 모든 URL에서 쿠키를 전송할 수 있음
                Secure : HTTPS일 경우에만 쿠키가 전송됨
                HttpOnly : 설정시 자바스크립트에서 쿠키에 접근할 수 없음. 쿠키 조작을 방지하기 위해 설정하는 것이 좋음
            */
        });
        res.end();
    // 3. name 이라는 쿠키가 있는 경우
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });
            res.end(data);
        } catch (Err) {
            res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8' });
            res.end(Err.message);
        }
    }
})
.listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중');
});
// 개발자도구 Application 탭에서 노출됨
