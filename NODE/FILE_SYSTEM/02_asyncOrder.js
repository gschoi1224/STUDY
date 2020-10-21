// 비동기 방식으로 하되 순서를 유지하는 방법
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if (err) throw err;
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data) => {
            if (err) throw err;
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});

/*
    시작
    1번 저를 여러 번 읽어보세요.
    2번 저를 여러 번 읽어보세요.
    3번 저를 여러 번 읽어보세요.
    끝
*/
// 콜백 지옥...