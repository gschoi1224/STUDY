# 함수와 메서드

## 함수 선언문

### function 키워드로 만드는 함수

-   자바스크립트

```js
function 함수 이름(매개변수1, 매개변수2[, ...]) {
    함수 몸통
}
```

-   타입스크립트 함수 선언문은 자바스크립트 함수 선언문에서 매개변수와 함수 반환값에 타입 주석을 붙이는 형태

```ts
function 함수 이름(매개변수1:타입1, 매개변수2:타입2[, ...]) : 반환값 타입 {
    함수 몸통
}
```

### 함수 시그니처

-   변수에 타입이 있듯이 함수 또한 타입이 있는데, 함수의 타입을 함수 시그니처(function signature)라고 함.

```ts
let printMe: (string, number) => void = function (
    name: string,
    age: number,
): void {};
```

### type 키워드로 타입 별칭 만들기

-   타입스크립트는 type이라는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용할 수 있게 해 주는 키워드를 제공함.
-   (string, number) => void 함수 시그니처를 stringNumberFunc이라는 이름으로 타입 별칭 마늗ㄹ기

```ts
type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function (a: string, b: number): void {};
let g: stringNumberFunc = function (c: string, d: number): void {};
```

### undefined 관련 주의 사항

```ts
interface INameable {
    name: string;
}
function getName(o: INameable) {
    return o.name;
}
let n = getName(undefined); // 오류 발생
console.log(n);
```

-   undefined는 최하위 타입이므로 인터페이스를 상속하는 자식 타입으로 간주됨.
-   이런 오류를 방지하기 위해 매개변숫값이 undefined인지 판별하는 코드를 작성해야 함.

```ts
function getName(o: INameable) {
    return o != undefined ? o.name : 'unknown name';
}
```

### 선택적 매개변수

-   함수의 매개변수에도 이름 뒤에 물음표를 붙일 수 있음

```ts
function fn(arg1: string, arg?: number) {
    console.log(`arg : ${arg}`);
}

fn('hello', 1); // arg: 1
fn('hello'); // arg: undefined
```

## 함수 표현식

### 함수는 객체

-   JS에서 함수는 Function 클래스의 인스턴스이다.

```ts
let add = new Function('a', 'b', 'return a + b');
console.log(add(1, 2)); // 3
```

### 일등 함수

-   일등 함수 기능을 제공하면 `함수형 프로그래밍 언어`라고 함.
-   일등 함수란, 함수와 변수를 구분(혹은 차별)하지 않는다는 의미.

```ts
let f = function (a, b) {
    return a + b;
};
f = function (a, b) {
    return a - b;
}; // 변수인지 함수인지 구분할 수 없ㅅ음
```

### 계산법

-   조급한 계산법 : 컴파일러가 1 + 2 라는 표현식을 만나면 조급한 계산법을 적용해 3이라는 값을 만듦.
-   느긋한 계산법 : function(a, b) {return a + b}라는 함수 표현식을 만나면 심벌 a와 심벌 b가 어떤 값인지 알 수 없어서 느긋한 계산법을 적용해 계산을 보류

### 함수 호출 연산자

-   어떤 변수가 함수 표현식을 담고 있다면, 변수 이름 뒤에 함수 호출 연산자()를 붙여서 호출할 수 있음.

```ts
let functionExpression = function (a, b) {
    return a + b;
};
let value = functionExpression(1, 2); // 3
```

-   컴파일러는 함수 호출문을 만나면 지금까지 미뤘던 함수 표현식에 조급한 계산법을 적용해 함수 표현식을 값으로 바꿈

### 키워드

-   함수 표현식을 담는 변수는 let 보다는 const 키워드로 선언하는 것이 바람직함.
-   let 키워드는 변숫값이 변할 수 있으나 const 키워드로 선언하면 함수 내용이 이후에 절대 바뀔 수 없기 때문에

## 일등 함수

### 콜백 함수

-   일등 함수 기능을 제공하는 언어에서 함수는 `함수 표현식`이라는 일종의 값이고 변수에 담을 수 있다.
-   매개변수 형태로 동작하는 함수를 콜백함수라고 한다.

```ts
export const init = (callback: () => void): void => {
    console.log('default initialization finished.');
    callback();
    console.log('all initialization finished');
};
import { init } from './init';
init(() => console.log('custom initialization finished'));

// default initialization finished.
// custom initialization finished.
// all initialization finished.
```

### 중첩 함수

```ts
const calc = (value : number, cb : (number) => void) : void => {
    let add = (a, b) => a + b
    function multiply(a, b) {return a * b}

    let result = multiplay(add(1, 2), value)
    cb(result)
}
calc(30, (result : number)) => console.log(`result is ${result}`) // result is 90
```

### 고차 함수와 클로저, 그리고 부분 함수

-   고차 함수의 일반적인 형태

```ts
const add1 = (a: number, b: number): number => a + b; // 보통 함수
const add2 =
    (a: number): ((number) => number) =>
    (b: number): number =>
        a + b;
```

-   예시

```ts
type NumberToNumberFunc = (number) => number;
export const add = (a: number): NumberToNumberFunc => {
    const _add: NumberToNumberFunc = (b: number): number => {
        return a + b; // 클로저
    };
    return _add;
};
```

```ts
import { NumberToNumberFunc, add } from './add';
let fn: NumberToNumberFunc = add(1);

let result = fn(2);
conosle.log(result); // 3
console.log(add(1)(2)); // 3
```

## 함수 구현 기법

### 매개변수 기본값 지정하기

-   매개변수 : 타입 = 매개변수 기본값

```ts
export type Person = { name: string; age: number };
export const makePerson = (name: stringm, age: number = 10): Person => {
    const person = { name: name, age: age };
    return person;
};
console.log(makePerson('Jack')); // {name : 'Jack', age : 10}
console.log(makePerson('Jane', 33)); // {name : 'Jane', age : 33}
```

### 객체를 반환하는 화살표 함수 만들기

```ts
export const makePerson = (name: string, age: number = 10): Person => {
    name, age;
}; // 중괄호를 객체가 아닌 복합 실행문으로 해석
export const makePerson = (name: string, age: number = 10): Person => ({
    name,
    age,
});
```

### 색인 키와 값으로 객체 만들기

-   (key, value) => ({[key] : value}) : 색인 기능 타입

```ts
const makeObject = (key, value) => ({ [key]: value });
console.log(makeObject('name', 'Jack')); // {name : 'Jack'}
console.log(makeObject('firstName', 'Jane')); // {firstName : 'Jane'}
```

-   타입스크립트에서 key와 value의 타입을 명시함

```ts
type KeyType = {
    [key: string]: string;
};
```
