const fs = require('fs');   // 파일 시스템에 접근하는모듈, 파일을 생성하거나 삭제하고 읽거나 쓸 수 있음, 폴더도 만들거나 지우기 가능

fs.readFile('./readme.txt', (err, data) => {    // 파일의 경로는 현재 파일 기준이 아니라 node 명령어를 실행하는 콘솔 기준
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});