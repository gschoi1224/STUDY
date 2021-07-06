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

## 배열의 메서드

### 전형적인 메서드 체인 방식

```ts
const multiply = (result, val) => result * val; // 07행에서 사용
let numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let tempResult = numbers
    .filter(val => val % 2 != 0)
    .map(val => val * val)
    .reduce(multiply, 1);
let result = Math.round(Math.sqrt(tempResult));
console.log(result); // 945
```

### filter 메서드

-   배열의 타입이 T[]일 때 배열의 filter 메서드는 다음과 같은 형태로 설계되었음

```ts
filter(callback: (value: T, index?: number): boolean): T[]
```

-   예시

```ts
const array = number[] = range(1, 10 + 1)
let odds: number[] = array.filter((value) => value % 2 != 0)
let evens: number[] = array.filter(value = value % 2 == 0)
console.log(odds, evens) // [1, 3, 5, 7, 9] [2, 4, 6, 8, 10]
```

### map 메서드

-   배열의 타입이 T일 때 배열의 map ㅔㅁ서드는 다음과 같은 형태로 설계되었음

```ts
map(callback: (value: T, index?: number) : Q): Q[]
```

-   예시

```ts
let squres: number[] = range(1, 5 + 1).map((val: number) => val * val);
console.log(squres); // [1, 4, 9, 16, 25]
```

### reduce 메서드

-   앞에서 구현한 fold 함수는 타입스크립트 배열의 reduce 메서드로 대체할 수 있음
-   배열의 타입이 T[]일 때 배열의 reduce 메서드는 다음과 같은 형태로 설계되었음

```ts
reduce(callback: (result: T, value: T), initialValue: T): T
```

-   1부터 100까지 더하는 로직을 reduce 메서드를 사용해 구현

```ts
let reduceSum: number = range(1, 100 + 1).reduce(
    (result: number, value: number) => result + value,
    0,
);
console.log(reduceSum);
```

## 순수 함수와 배열

### 순수 함수란

-   부수 효과(side-effect)가 없는 함수
-   부수 효과란 함수가 가진 고유한 목적 이외에 다른 효과가 나타나는 것을 의미하며 부작용이라고도 함
-   부수 효과가 있는 함수는 불순 함수라고 함

### 순수 함수의 조건

-   함수 몸통에 입출력 관련 코드가 없어야 한다.
-   함수 몸통에서 매개변숫값을 변경시키지 않는다(즉, 매개변수는 const나 readonly 형태로만 사용한다)
-   함수는 몸통에서 만들어진 결과를 즉시 반환한다.
-   함수 내부에 전역 변수나 정적 변수를 사용하지 않는다.
-   함수가 예외를 발생시키지 않는다.
-   함수가 콜백 함수로 구현되었거나 함수 몸토엥 콜백 함수를 사용하는 코드가 없다.
-   함수 몸통에 Promise와 같은 비동기 방식으로 동작하는 코드가 없다.

### 예시

-   순수 함수

```ts
function pure(a: number, b: number): number {
    return a + b;
}
```

-   매개변수를 변경하므로 부수효과 발생

```ts
function inpure1(array: number[]): void {
    array.push(1);
    array.splice(0, 1);
}
```

-   g라는 외부 변수를 사용하므로 불순 함수

```ts
let g = 10;
function impure2(x: number) {
    return x + g;
}
```

### 타입 수정자 readonly

-   타입스크립트는 순수 함수 구현을 쉽게 하도록 readonly 키워드를 제공함.
-   readonly 타입으로 선언된 매개변숫값을 변경하는 시도가 있으면 문제가 있는 코드라고 알려줘서 불순 함수가 되지 않게 방지함.
-   타입스크립트에서 인터페이스, 클래스, 함수의 매개변수 등은 let이나 const 키워드 없이 선언하므로 이런 심벌에 const와 같은 효과를 주려면 readonly 라는 타입 수정자가 필요함.

### 불변과 가변

-   변수가 const나 readonly를 명시하고 있으면 변숫값은 초깃값을 항상 유지하고 이런 변수는 변경할 수 없다는 의미로 `불변(immutable) 변수`라고 함.
-   let이나 readonly를 명시하지 않은 변수는 언제든 값을 변경할 수 있으므로 `가변(muttable) 변수`라고 함.

### 깊은 복사와 얕은 복사

-   프로그래밍 언어에서 어떤 변숫값을 다른 변숫값으로 설정하는 것을 `복사`라고 표현함.
-   `깊은 복사`: 대상 변숫값이 바뀔 때 원본 변숫값은 그대로인 형태로 동작

```ts
let original = 1;
let copied = original;
copied += 2;
console.log(original, copied); // 1 3
```

-   객체와 배열의 얕은 복사

```ts
const originalArray = [5, 3, 9, 7];
const shallowCopiedArray = originalArray;
shallowCopiedArray[0] = 0;
console.log(originalArray, shallowCopiedArray); // [0, 3, 9, 7] [0, 3, 9, 7]
```

-   전개 연산자를 이용한 깊은 복사

```ts
const oArray = [1, 2, 3, 4];
const deepCopiedArray = [...oArray];
deepCopiedArray[0] = 0;
console.log(oArray, deepCopiedArray); // [1, 2, 3, 4] [0, 2, 3, 4]
```

### 배열의 sort 메서드를 순수 함수로 구현하기

-   Array 클래스는 sort 메서드를 제공해 배열의 아이템을 오름차순 혹은 내림차순으로 정렬해 줌.
-   sort 메서드는 원본 배열의 내용을 변경하기 때문에 readonly 타입으로 입력 배열의 내용을 유지한채 정렬할 수 있도록 구현한 예

```ts
const pureSort = <T>(array: readonly T[]): T[] => {
    let deepCopied = [...array];
    return deepCopied.sort();
};
let beforeSort = [6, 2, 9, 0];
const afterSort = pureSort(beforeSort);
console.log(beforeSort, afterSort); // [6, 2, 9, 0] [0, 2, 6, 9]
```

### 배열의 순수한 삭제

-   배열에서 특정 아이템을 삭제할 때는 splice 메서드를 사용하지만 splice는 원본 배열의 내용을 변경하므로 순수 함수에서는 사용할 수 없음
-   filter 메서드를 사용하면 원본 배열의 내용은 훼손하지 않으면서 조건에 맞지 않는 아이템을 삭제할 수 있음

```ts
const pureDelete = <T>(
    array: readonly T[],
    cb: (val: T, index?: number) => boolean,
): T[] => array.filter((val, index) => cb(val, index) === false);
const mixedArray: object[] = [
    [],
    { name: 'Jack' },
    { name: 'Jane', age: 32 },
    ['description'],
];
const objectsOnly: object[] = pureDelete(mixedArray, val => Array.isArray(val));
console.log(mixedArray, objectsOnly);
// 실행 결과
// [[], {name: 'Jack'}, {name: 'Jane', age: 32}, ['description']]
// [{name: 'Jack'}, {name: 'Jane', age: 32}]
```

### 가변 인수 함수

-   함수를 호출할 때 전달하는 인수의 개수를 제한하지 않는 것
-   예시

```ts
const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
    let result: T[] = [];
    for (let index = 0; index < array.length; index++) {
        const array: T[] = arrays[index];
        // result와 array 배열을 각각 전개(spread)하고 결합해야 T[] 타입 배열을 생성할 수 있다
        result = [...result, ...array];
    }
    return result;
};
```
