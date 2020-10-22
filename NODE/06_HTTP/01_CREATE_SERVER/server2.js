// HTML 파일을 fs 모듈로 읽어서 전송
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./01_server2.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'}); // text/plain 일반 문자열일 경우
        res.end(err.message);
    }
})
.listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
});
/*
    HTTP 상태 코드
    2XX : 성공을 알리는 상태 코드, 200(성공), 201(작성됨)이 많이 사용됨
    3XX : 리다이렉션을 알리는 상태 코드, 대표적으로 301(영구 이동), 302(임시 이동), 304(수정되지 않음 : 요청의 응답으로 캐시를 사용함)
    4XX : 요청 오류를 나타냄. 요청 자체에 오류가 있을 경우. 대표적으로 400(잘못된 요청), 401(권한 없음), 403(금지됨), 404(찾을 수 없음)
    5XX : 서버 오류. 요청은 제대로 왔지만 서버에 오류가 생긴 경우. 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)
*/