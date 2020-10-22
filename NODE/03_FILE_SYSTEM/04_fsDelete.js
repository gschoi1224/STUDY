// 폴더 내용 확인 및 삭제
const fs = require('fs').promises;

fs.readdir('./folder')  // fs.readdir(경로, 콜백) : 폴더 안의 내용물 확인 배열로 반환
.then(dir => {
    console.log('폴더 내용 확인', dir);
    return fs.unlink('./folder/newFile.js');    // fs.unlink(경로, 콜백) : 파일을 지울 수 있음, 파일이 없으면 에러남
})
.then(() => {
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');    // fs.rmdir(경로, 콜백) : 폴더 지우기. 폴더 안에 파일들이 있으면 에러가 발생하므로 먼저 내부 파일을 모두 지워야 함
})
.then(() => {
    console.log('폴더 삭제 성공');
})
.catch(err => {
    console.error(err);
});