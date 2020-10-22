const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});  // 성공적인 요청임을 알리는 200, Content-Type : text/html; 콘텐츠의 형식이 HTML임을 알림, charset=utf-8 한글 표시를 위해
    res.write('<h1>Hello Node!</h1>');  // 응답 보내기
    res.end('<p>Hello Server!</p>');    // 응답 종료 인수가 있다면 그것까지 보내고 종료
})
.listen(8080, () => {   // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!'); 
})