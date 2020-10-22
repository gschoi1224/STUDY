const {odd, even} = require('./02_var');
const checkNumber = require('./02_func');  // 참조할 때 변수이름 바꾸기 가능

function checkStringOddOrEven(str) {
    if (str.length % 2) {   // 홀수면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));