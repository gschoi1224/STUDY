# 배열에 담긴 수 다루기

## 선언형 프로그래밍

-   함수형 프로그래밍은 선언형 프로그래밍 방식으로 코드를 작성함
-   모든 입력 데이터는 단순 데이터보다 배열 형태를 주로 사용함
-   [람다 라이브러리로 디버깅 하는 예](./src/inc.ts)

## 사칙연산 함수

-   람다에서 제공하는 사칙 연산 관련 함수들

```ts
R.add(a: number)(b: number) // a + b
R.subtract(a: number)(b: number)    // a - b
R.multiply(a: number)(b: number)    // a * b
R.divide(a: number)(b: number)  // a / b
```

-   포인트가 있는 함수 vs 포인트가 없는 함수

```ts
const pointO = (b: number): number => R.add(1)(b);
const pointX = R.add(1);
```

-   포인트가 없는 함수를 포인트가 있는 함수에 사용하기

```ts
R.map((n: number) => pointX(n));
```

-   R.map(콜백함수)의 콜백함수를 익명 함수로 구현한 것이고 pointX는 그 자체로 콜백 함수로 사용될 수 있으므로 간결하게 표현하면

```ts
R.map(pointX);
R.map(R.add(1));
```

-   [예시](./src/add.ts)

## R.addIndex 함수

-   Array.map은 두 번째 매개변수로 index를 제공하지만, R.map은 제공하지 않음
-   R.map이 Array.map처럼 동작하려면 R.addIndex 함수를 사용해 R.map이 index를 제공하는 새로운 함수를 만들어야 함

```ts
const indexedMap = R.addIndex(R.map);
indexMap((value: number, index: number) => R.add(number)(index));
// 간결하게 구현
indexMap(R.add);
```

-   [예시](./src/addIndex.ts)

## R.flip 함수

-   R.subtract와 같은 2차 고차 함수의 매개 변수 순서를 바꿔줌

```ts
const reverseSubtract = R.flip(R.subtract);
```

-   [예시](./src/subtract.ts)
