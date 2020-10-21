// 순서대로 하고싶을때
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');
/*
    시작
    1번 저를 여러 번 읽어보세요.
    2번 저를 여러 번 읽어보세요.
    3번 저를 여러 번 읽어보세요.
    끝
*/
// 백그라운드는 fs 작업을 동시에 처리할 수도 있는데 Sync 메서드를 사용하면 백그라운드조차 동시에 처리할 수 없게 됨
// 동기 메서드들은 이름 뒤에 Sync가 부텅 있어 구분하기 쉬움
// 프로그램을 처음 실행할 때 초기화 용도로만 사용하는 것을 권장