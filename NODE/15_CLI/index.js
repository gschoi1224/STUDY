#!/usr/bin/env node
 // 리눅스나 맥에서는 /usr/bin/env에 등록된 node 명령어로 이 파일을 실행하라는 뜻

//console.log('Hello CLI', process.argv); // 옵션 목록이 배열로 표시됨

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear(); // 콘솔 내용 지우기
const answerCallback = answer => {
    if (answer === 'y') {
        console.log('감사합니다!');
        rl.close();
    } else if (answer === 'n') {
        console.log('죄송합니다!');
        rl.close();
    } else {
        console.clear();
        console.log('y 또는 n만 입력하세요.');
        rl.question('예제가 재미있습니까? (y/n)', answerCallback);
    }
}

rl.question('예제가 재미있습니까? (y/n)', answerCallback);