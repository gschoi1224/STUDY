/*
상수와 리터럴
상수와 리터럴 둘 다 변하지 않는 값(데이터)를 의미함.
상수는 변하지 않는 변수를 듯함
C, C++, C#에서는 const, JAVA는 final 제어자를 씀
리터럴은 변수에 넣는 변하지 않는 데이터를 의미함
final int a = 1; 일때
a는 상수, 1은 리터럴
*/

// 구버전
var sayNode = function() {
    console.log('Node');
}
var es = 'ES';
var oldObject = {
    sayJS : function() {
        console.log('JS');
    },
    sayNode : sayNode,
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic

// ES6+
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode, // 객체의 메서드에 함수를 연결할 때 속성명과 변수명이 동일한 경우 한번만 써도 됨
    [es + 6] : 'Fantastic', // 객체 안에서 선언할 수 있도록 바뀜
};
newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic

