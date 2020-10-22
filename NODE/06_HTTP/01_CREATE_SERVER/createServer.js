const http = require('http');
// http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 http 모듈 사용

http.createServer((req, res) => {   // req : 요청, res 응답
    // 여기에 어떻게 응답할지 적습니다.
});