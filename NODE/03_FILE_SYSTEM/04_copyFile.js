// 노드 8.5 버전 이후에는 createReadStream과 createWriteStream을 pipe하지 않아도 파일을 복사할 수 있음
const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
.then(() => {
    console.log('복사 완료');
})
.catch(err => {
    console.error(err);
});