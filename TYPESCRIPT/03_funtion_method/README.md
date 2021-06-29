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
