const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdefg.js');
}, 1000);
// 프로미스의 에러는 catch하지 않아도 알아서 처리됨