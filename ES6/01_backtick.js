// 구버전
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + ' 더하기 ' + num2 + ' 는 \'' + result + '\'';
console.log(string1);  //1 더하기 2 는 '3'

// ES6
const num3 = 1;
const num4 = 2;
const result2 = 3;
const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2); //1 더하기 2는 '3'

// 따옴표 대신 백틱(`)을 이용하므로 큰따옴표와 작은따옴표도 변수 안에 편하게 넣을 수 있다. 
// 변수는 ${변수} 형식으로 사용 가능