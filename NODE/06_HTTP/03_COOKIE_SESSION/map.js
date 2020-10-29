const oneTwoThree = [1, 2, 3];
let result = oneTwoThree.map(v => {
    console.log(v);
    return v;
});
// 콘솔에는 1, 2, 3이 찍힘
oneTwoThree;
result;
oneTwoThree === result;
// map은 반복문을 돌며 배열 안의 요소들을 1대1로 짝지어 주는 것
// 규칙적인 배열만 반환할 수 있는게 아니라, 함수 안에 적어준대로 반환할 수 있어서 자유도가 높음
// 정리 : map은 배열을 1대1로 짝짓되 기존 객체를 수정하지 않는 메서드

// 배열.reduce((누적값, 현잿값, 인덱스, 요소) => {return 결과}, 초깃값);
// 이전값이 아니라 누적값
result = oneTwoThree.reduce((acc, cur, i) => {
    console.log(acc, cur, i);
    return acc + cur;
}, 0);
result; // 6
// 0 1 0
// 1 2 1
// 3 3 2
// reduceRight는 reduce와 동작은 같지만 요소 순회를 오른쪽에서부터 왼쪽으로 한다는 점이 차이

result = oneTwoThree.reduce((acc, cur) => {
    acc.push(cur % 2 ? '홀수' : '짝수');
    return acc;
}, []);
result; // ['홀수', '짝수', '홀수']
// 초기값을 배열로 만들고, 배열에 값들을 push하면 map과 같아짐. 이름 응용하여 조건부로 push를 하면 filter와 같아짐.

// 홀수만 필터링 하는 코드
result = oneTwoThree.reduce((acc, cur) => {
    if (cur % 2) acc.push(cur);
    return acc;
}, []);
result; // [1, 3]

// reduce는 비동기 프로그래밍을 할 때에도 유용함
const promiseFactory = (time) => {
    return new Promise((resolve, reject) => {
        console.log(time);
        setTimeout(resolve, time);
    });
};
[1000, 2000, 3000, 4000].reduce((acc, cur) => {
    return acc.then(() => promiseFactory(cur));
}, Promise.resolve());
// 바로 1000
// 1초 후 2000
// 2초 후 3000
// 3초 후 4000