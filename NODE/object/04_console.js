const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    oustside : {
        insider : {
            key : 'value',
        },
    },
};

console.time('전체 시간');  // console.time과 console.timeEnd 사이의 시간을 측정
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 답아주세요');

console.table([{name : '제로', birth : 1994}, {name : 'hero', birth : 1988}]);

console.dir(obj, {colors : false, depth : 2});
console.dir(obj, {colors : true, depth : 1});   
// 객체를 콘솔에 표시할 때, 첫 번째 인수로 표시할 객체를 넣고, 두 번째 인수로 옵션, colors를 true로 하면 콘솔에 색이 추가됨, depth는 객체 안의 단계를 몇단계까지 표시할것인가 기본은 2

console.time('시간 측정');
for (let i = 0; i < 00000; i++) {
    console.timeEnd('시간 측정');
}

function b() {
    console.trace('에러 위치 추적');    // 에러가 어디서 발생했는지 추적할 수 있게됨 
}

function a() {
    b();
}

a();

console.timeEnd('전체 시간');