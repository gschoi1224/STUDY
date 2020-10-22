const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});
console.log("끝");
// 비동기 메서드들은 백그라운드에 해당 파일을 읽으라고만 요청하고 다음 작업으로 넘어가기 때문에 실행 결과가 계속 달라짐
// 파일 읽기 요청만 해서 '끝'이 먼저 찍힘
/*
    시작
    끝
    3번 저를 여러 번 읽어보세요.
    1번 저를 여러 번 읽어보세요.
    2번 저를 여러 번 읽어보세요.
*/
// 수백 개의 I/O 요청이 들어와도 메인 스레드는 백그라운드에 요청 처리를 위임함
