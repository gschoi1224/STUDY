const fs = require('fs');

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {    // fs.unlink로 존재하지 않는 파일을 지움
        if (err) {
            console.error(err);
        }
    });
}, 1000);
// throw를 한 경우에는 반드시 try/catch 로 throw한 에러를 잡아야 함
