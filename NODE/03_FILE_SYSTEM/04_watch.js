// watch : 파일/폴더의 변경 사항을 감시할 수 있는 메서드
const fs = require('fs');

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});
// rename 발생 후에는 더 이상 watch가 수행되지 않으므로 주의 요함