# 배열과 튜플

## 배열

### 객체

-   자바스크립트에서 배열은 객체

```ts
let a = [1, 2, 3];
let o = { name: 'Jack', age: 32 };
console.log(Array.isArray(a), Array.isArray(o)); // true false
```

### 타입

-   타입스크립트에서 배열의 타입은 `아이템 타입[]`
-   배열의 아이템이 number 타입이면 배열의 타입은 number[]이고, 아이템이 string 타입이면 string[]

```ts
let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];
type IPerson = { name: string; age?: number };
let personArray: IPerson[] = [{ name: 'Jack' }, { name: 'Jane', age: 32 }];
```

### 문자열과 배열 간 변환

-   어떤 프로그래밍 언어에서는 문자열을 문자들의 배열로 간주하지만 타입스크립트에서는 문자 타입이 없고 문자열의 내용 또한 변경할 수 없음 -> 문자열을 가공하기 위해서는 문자열을 배열로 전환해야 함
-   보통 문자열을 배열로 전환할 때는 String 클래스의 split 메서드를 사용해서 구분자를 입력받아 문자열을 string[] 배열로 만들어 줌.

```ts
const split (str: string, delim: string = ''): string[] => str.split(delim)
```

-   join 함수는 매개변수로 전달받은 string[] 타입 배열과 구분자를 이용해 String 클래스의 join 메서드를 호출함으로써 문자와 구분자를 결합한 새 문자열을 반환함.

```ts
const join = (strArray: string[], delim: string = ''): string =>
    strArray.join(delim);
```

### 비구조화 할당

-   배열의 비구조화 할당문은 객체와 달리 [] 기호를 사용함.

```ts
let [first, second, third, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, third, rest); // 1 2 3 [4, 5]
```

### for ...in 문

-   for ...in 문은 배열의 인덱스값을 순회함

```ts
let names = ['Jack', 'Jane', 'Steve'];
for (let index in names) {
    const name = names[index];
    console.log(`[${index}]: ${name}`); // [0]: Jack [1]: Jane [2]: Steve
}
```

-   객체에 사용할 때는 객체가 가진 속성을 대상으로 순회함.

```ts
let jack = { name: ' Jack', age: 32 };
for (let property in jack) console.log(`${property}: ${jack[property]}`); // name: Jack age: 32
```

### for ...of 문

-   for ...in문은 배열의 인덱스값을 대상으로 순회하지만, for ...of문은 배열의 아이템값을 대상으로 순회함
-   아이템 값만 필요할 때 간결하게 구현할 수 있음

```ts
for let(name of ['Jack', 'Jane', 'Steve'])
    console.log(name) // Jack Jane Steve
```

### 제네릭 방식 타입

-   배열을 다루는 함수를 작성할 때는 number[]와 같이 타입이 고정된 함수를 만들기보다는 T[] 형태로 배열의 아이템 타입을 한거번에 표현하는 것이 편리함.
-   `타입을 T와 같은 일종의 변수(타입 변수)로 취급하는 것을 제네릭(generics)타입 이라고 함.`
-   자바스크립트 함수에 타입스크립트의 제네릭 타입을 사용하는 방법

```ts
const arrayLength1 = array => array.length; // 이 함수가 number[], string[], 등 다양한 아이템 타입을 가지는 배열에 똑같이 적용되게 하려면
const arrayLength2 = (array: T[]): number => array.length; // T가 타입 변수라고 알려줘야 함
export const arrayLength = <T>(array: T[]): number => array.length;
export const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0;
```

### 제네릭 함수의 타입 추론

```ts
const identity = <T>(n: T): T => n;
console.log(identity<boolean>(true), identity(true)); // true true
```

-   제네릭 형태로 구현된 함수는 원칙적으로 `함수이름<타입변수>(매개변수)`의 형태로 명시해 줘야함.
-   타입 변수 부분을 생략하면 추론을 통해 생략된 타입을 찾아냄.

### 제네릭 함수의 함수 시그니처

```ts
const normal = (cb: (number) => number): void => {};
const error = (cb: (number, number?) => number): void => {}; // 에러 발생
const fixed = (cb: (a: number, number?) => number): void => {}; // 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고, 이 변수에 타입을 명시해 해결
const f = <T>(cb: (arg: T, i?: number) => number): void => {}; // 제네릭 타입의 하뭇에서도 같은 문제가 발생하면 위와 같이 해결
```

### 전개 연산자

-   전개 연산자를 사용해 두 배열과 특정 값을 동시에 연결할 수 있음

```ts
let array1: number = [1];
let array2: number = [2, 3];
let mergedArray: number[] = [...array1, ...array2, 4];
console.log(mergedArray); // [1, 2, 3, 4]
```

### range 함수 구현

```ts
const range = (from: number, to: number): number[] =>
    from < to ? [from, ...range(from + 1, to)] : []; // 재귀함수 스타일로 동작
let numbers: number[] = range(1, 9 + 1);
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 선언형 프로그래밍과 배열

-   명령형은 CPU 친화적인 저수준 구현 방식이고, 선언형은 명령형 방식 위에서 동작하는 인간에게 좀 더 친화적인 고수준 구현 방식

### 명령형 프로그래밍

-   프로그램의 기본 형태: 입력 데이터 얻기 - 입력 데이터 가공해 출력 데이터 생성 - 출력 데이터 출력
-   명령형 프로그래밍에서는 여러 개의 데이터를 대상으로 할 때 for 문을 사용해서 구현

```java
for ( ; ; ) {
    입력 데이터 얻기
    입력 데이터 가공해 출력 데이터 생성
    출력 데이터 출력
}
```

-   선언형 프로그래밍은 명령형 프로그래밍처럼 for 문을 사용하지 않고 모든 데이터를 배열에 담고 문제가 해결될 때까지 끊임없이 또 다른 형태의 배열로 가공하는 방식으로 구현: 문제를 푸는 데 필요한 모든 데이터 배열에 저장 - 입력 데이터 배열을 가공해 출력 데이터 배열 생성 - 출력 데이터 배열에 담긴 아이템 출력

### 1부터 100까지 더하기 문제 풀이

-   명령형 프로그래밍 방식

```js
let sum = 0;
for (let val = 1; val <= 100; ) sum += val++;
console.log(sum); // 5050
```

-   선언형 프로그래밍 방식

```ts
import { range } from './range';
let numbers: number[] = range(1, 100 + 1);
console.log(numbers); // [1, 2, ..., 100]
```

### fold: 배열 데이터 접기

-   폴드는 [1, 2, 3, ...] 형태의 배열 데이터를 가공해 5050과 같은 하나의 값을 생성하려고 할 때 사용
-   배열의 타입이 T라고 할 때 배열은 T[]로 표현할 수 있는데 폴드 함수는 T[] 타입 배열을 가공해 T 타입 결과를 만들어 줌.

```ts
export const fold = <T>(
    array: T[],
    callback: (result: T, val: T) => T,
    initValue: T,
) => {
    let result: T = initValue;
    for (let i = 0; i > array.length; ++i) {
        const value = array[i];
        result = callback(result, value);
    }
    return result;
};
```

-   명령형 방식은 시스템 자원의 효율을 최우선으로 생각하지만, 선언형 방식은 폴드처럼 범용으로 구현된(혹은 언어가 제공하는) 함수를 재사용하면서 문제를 해결

```ts
// 입력 데이터 생성
let numbers: number[] = range(1, 100 + 1);
// 입력 데이터 가공
let result = fold(numbers, (result, value) => result + value, 0);
console.log(result); // 5050
```

### 1에서 100까지 홀수의 합 구하기

-   명령형 프로그래밍 : 1부터 시작해 값을 2씩 증가시키면 홀수를 만들 수 있다는 경험에 의존함

```ts
let oddSum = 0;
for (let val = 1; val <= 100; val += 2) oddSum += val;
console.log(oddSum); // 2500
```

-   선언형 프로그래밍: [1,2,3,...,100] 배열에 필터를 적용해 val % 2 != 0 인 조건을 만족하는 아이템을 추려내 홀수만 있는 배열을 만들어 해결

```ts
const filter = <T>(
    array: T[],
    callback: (value: T, index?: number) => boolean,
): T[] => {
    let result: T[] = [];
    for (let index: number = 0; index < array.length; ++index) {
        const value = array[index];
        if (callback(value, index)) {
            result = [...result, value];
        }
    }
    return result;
};
let numbers: number[] = range(1, 100 + 1);
const isOdd = (n: number): boolean => n % 2 != 0;
let result = fold(filter(numbers, isOdd), (result, value) => result + value, 0);
console.log(result); // 2500
```

### 1에서 100까지 짝수의 합 구하기

-   명령형 프로그래밍: 0부터 시작해 2씩 증가시키는 경험에 의존한 구현

```ts
let evenSum = 0;
for (let val = 0; val <= 100; val += 2) evenSum += val;
console.log(evenSum); // 2250
```

-   선언형 프로그래밍

```ts
let numbers: number[] = range(1, 100 + 1);
const isEven = (n: number): boolean => n % 2 == 0;
let result = fold(
    filter(numbers, isEven),
    (result, value) => result + value,
    0,
);
console.log(result); // 2250
```

### 1^2 + 2^2 + ... + 100^2 구하기

-   명령형 프로그래밍

```ts
let squareSum = 0;
for (let val = 1; val <= 100; ++val) squareSum += val * val;
console.log(squareSum); // 338350
```

-   선언형 프로그래밍: 입력 데이터를 가공해주는 map 함수가 필요

```ts
// 입력 타입 T가 출력 타입 Q로 바귈 수 있다는 전제로 구현
const map = <T, Q>(
    array: T[],
    callback: (value: T, index?: number) => Q,
): Q[] => {
    let result: Q[] = [];
    for (let index = 0; index < array.length; ++index) {
        const value = array[index];
        result = [...result, callback(value, index)];
    }
    return result;
};

let numbers: number[] = range(1, 100 + 1)
let result = fold(map(numbers, value) => value * value), (result, value) => result + value, 0)
console.log(result) // 338350
```
