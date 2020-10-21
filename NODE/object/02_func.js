const {odd, even} = require('./02_var');

function checkOdOrEven(num) {
    if (num % 2) {  // 홀수면
        return odd;
    }
    return even;
}

module.exports = checkOdOrEven;
// ES2015 자체 모듈
// 내보내기 export default 변수(함수)명
// 불러오기 import {변수명, 변수명} from = './파일경로';
// 이렇게 쓰려면 확장자를 mjs로 저장해야됨 아니면 package.json에 type : "module" 속성 넣어야됨
