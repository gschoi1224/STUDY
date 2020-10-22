const fs = require('fs').promises;
const constants = require('fs').constants;
// F_OK : 파일 존재 여부, R_OK : 읽기 권한 여부, W_OK : 파일 쓰기 권한 여부
// 파일/폴더나 권한이 없다면 에러 코드는 ENOENT
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK) // fs.access(경로, 옵션, 콜백) : 폴더나 파일에 접근할 수 있는지 체크 
.then(() => {
    return Promise.reject('이미 폴더 있음');
})
.catch(err => {
    if (err.code === 'ENOENT') {
        console.log('폴더 없음');
        return fs.mkdir('./folder');    // 폴더를 만드는 메서드, 이미 폴더가 있다면 에러가 발생하므로 access 메서드를 호출해 폴더 있는지 확인 필요
    }
    return Promise.reject(err);
})
.then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');    // fs.open(경로, 옵션, 콜백) : 파일의 아이디(fd변수)를 가져오는 메서드, 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옴
    //가져온 아이디를 사용해 fs.read나 fs.write로 읽거나 쓸 수 있음. 두 번째 인수로 어떤 동작을 할 것인지 설정 가능 w:쓰기, r:읽기, a:기존 파일에 추가
})
.then(fd => {
    console.log('빈 파일 만들기 성공', fd);
    fs.rename('./folder/file.js', './folder/newfile.js');   // fs.rename(기존 경로, 새 경로, 콜백) : 파일의 이름을 바꾸는 메서드 같은 폴더를 지정하지 않으면 잘라내기처럼 사용 가능
})
.then(() => {
    console.log('이름 바꾸기 성공');
})
.catch(err => {
    console.error(err);
});