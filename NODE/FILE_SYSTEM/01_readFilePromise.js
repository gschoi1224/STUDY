const fs = require('fs').promises;
// fs는 기본적으로 콜백 형식의 모듈이므로 실무에서 사용하기가 불편 -> fs 모듈을 프로미스 형식으로 바꿔주는 방법 사용

fs.readFile('./readme.txt')
.then(data => {
    console.log(data);
    console.log(data.toString());
})
.catch(err => {
    console.error(err);
});