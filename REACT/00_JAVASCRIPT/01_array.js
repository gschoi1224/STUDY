/**    forEach     */
const superheroes = ["아이언맨", "캡틴 아메리카", "토리", "닥터 스트레인저"];

for (let i = 0; i > superheroes.length; i++) {
    console.log(superheroes[i]);
}
// 같음
superheroes.forEach((hero) => {
    console.log(hero);
});

/**    map     */
// 배열 안의 각 원소를 변환 할 때 사용되며, 이 과정에서 새로운 배열이 만들어짐.
const array = [1, 2, 3, 4, 5, 6, 7, 8];

// 맵 사용 안 하는 경우
const squared = [];
for (let i = 0; i < array.length; i++) {
    squared.push(array[i] * array[i]);
}

console.log(squared);

// forEach 사용
const forEachSquared = [];
array.forEach((n) => {
    forEachSquared.push(n * n);
});

// map 사용
const square = (n) => n * n;
const mapSquared = array.map(square); // map 함수의 파라미터로는 변화를 주는 함수를 전달함
// array.map(n => n * n); 으로 해도 됨
console.log(mapSquared);

/**    indexOf     */
const index = superheroes.indexOf("토르"); // 2

/**     findIndex      */
// 배열 안에서 Object 를 찾기 위해 쓰는 함수
const todos = [{
        id: 1,
        text: "자바스크립트 입문",
        done: true,
    },
    {
        id: 2,
        text: "함수 배우기",
        done: true,
    },
    {
        id: 3,
        text: "객체와 배열 배우기",
        done: true,
    },
    {
        id: 4,
        text: "배열 내장함수 배우기",
        done: false,
    },
];

const findIndex = todos.findIndex((todo) => todo.id === 3);
console.log(findIndex); // 2

/** find  */
// findIndex가 index를 반환했다면 find는 값 자체를 반환
const find = todos.find((todo) => {
    todo.id === 3;
});
console.log(find); // { id : 3, text : '객체와 배열 배우기', done : true }

/**  filter  */
// 배열에서 특정 조건을 만족하느 값들만 따로 추출하여 새로운 배열을 만든다
const tasksNotDone = todos.filter((todo) => todo.done === false);
console.log(tasksNotDone);

/** every */
// 배열내 모든 값이 조건을 만족하면 true
/** some */
// every의 반대

/**
 * [
 *  {
 *      id : 4,
 *      text : '배열 내장 함수 배우기',
 *      done : false
 *  }
 * ]
 */

/**   splice    */
// 배열에서 특정 항목을 제거할 떄 사용
const numbers = [10, 20, 30, 40];
const numIndex = numbers.indexOf(30);
numbers.splice(numIndex, 1); // 지우기 시작할 인덱스, 몇개 지울지, 그 자리에 추가할 값
console.log(numbers); // [ 10, 20, 40 ]

/**   slice   */
// splice랑 비슷하지만 기존의 배열을 건드리지 않고 잘라냄
const sliced = numbers.slice(0, 2); // 0부터 시작해서 2 전까지
console.log(sliced); // [10, 20]
console.log(numbers); // [10, 20, 40]

/**   shift   */
const value = numbers.shift(); // 첫 번째 값 추출
console.log(value); // 10
console.log(numbers); // 20, 30, 40

/**   pop   */
const value2 = numbers.pop(); // 마지막 값 추출
console.log(value2); //  40
console.log(numbers); //  10, 20, 30

/**   unshift   */
numbers.unshift(5); // 배열의 맨 앞에 새 원소를 추가
console.log(numbers); // 5, 10, 20, 30, 40

/**  concat  */
// 배열을 합쳐줌
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const concated = arr1.concat(arr2);

console.log(concated); // [1, 2, 3, 4, 5, 6];

/**   join   */
// 배열 안의 값들을 문자열 형태로 합쳐줌
console.log(array.join()); // '1,2,3,4,5,6,7,8'
console.log(array.join(" ")); // 1 2 3 4 5 6 7 8
console.log(array.join(", ")); // 1, 2, 3, 4, 5, 6, 7, 8

/************* reduce *************/
// numbers = [1,2,3,4,5,6,7,8];
// reduce 사용 안 할 경우
let sum = 0;
array.forEach((n) => {
    sum += n;
});
console.log(sum); // 36

// reduce 사용
sum = 0;
sum = array.reduce((accumulator, current) => accumulator + current, 0); // 배열.reduce(콜백함수(누적값, 현재값, 인덱스, 배열), 초기값)
console.log(sum); // 36

sum = array.reduce((accumulator, current) => {
    console.log({ accumulator, current });
    return accumulator + current;
}, 0);

console.log(sum);