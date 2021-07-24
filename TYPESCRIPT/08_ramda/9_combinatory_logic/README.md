# 조합 논리

## 조합자

-   조합논리학은 `조합자`라는 특별한 형태의 고차 함수들을 결합해 새로운 조합자를 만들어 내는 것
-   함수형 언어의 컴파일러를 만드는 데 필요한 이론을 검증하고 개발할 때 주로 사용됨

## 람다가 제공하는 조합자

-   R.identity: I(identity)
-   R.always: K(sonstant)
-   R.applyTo: T(thrush)
-   R.unnest: W(duplication)
-   R.flip: C(flip)
-   R.ap: S(substitution)

## R.chain

-   함수를 매개변수로 받아 동작하는 함수
-   매개변수가 한 개일 때는 [flatMap함수](./src/flatMap.ts)처럼 동작
-   매개변수가 두 개일 때는 [chainTwoFunc함수](./src/chainTwoFunc.ts)처럼 동작

## R.flip 조합자

-   2차 고차 함수의 매개변수의 순서를 서로 바꿔주는 역할

```ts
const flip = cb => a => b => cb(b)(a);
```

-   [예시](./src/flip-test.ts)

## R.identity 조합자

-   매개변수를 그대로 반환해주지만 조합자의 구조상 반드시 함수가 있어야 하는 곳에 필요

```ts
const identity = x => x;
```

-[flatMap 함수가 요구하는 콜백 함수에 R.identity를 사용한 예](./src/unnest-using-flatMap.ts)

## R.always(constant) 조합자

-   두 개의 고차 매개변수 중 첫 번째 것을 반환함.

```ts
const always = (x = y => x);
```

-   두 개의 매개변수가 필요한 조합자에 R.identity처럼 사용됨
-   R.flip(R.always)는 항상 두 번째 매개변수값만 반환함
-   [예시](./src/first-second.ts)

## R.applyTo 조합자

-   첫 번째 매개변수를 값으로, 두 번째 매개변수를 콜백함수로 받아 동작함

```ts
const applyTo = value => cb => cb(value);
```

-   [예시](./src/applyTo-test.ts)

## R.ap 조합자

-   콜백 함수들의 배열을 첫 번째 매개변수로, 배열을 두 번째 매개변수로 입력받는 2차 고차 함수

```ts
const ap = ([콜백 함수]) => 배열 => [콜백 함수](배열)
```

-   [콜백 함수가 한 개일 때는 R.map 함수처럼 동작](./src/ap-test.ts)
-   [콜백 함수가 두 개일 때는 R.chain(n => [n, n])처럼 동작](./src/ap-test2.ts) -> 콜백 함수의 배열 중 앞부터 순서대로 계산 결과를 모두 통합해 한 개의 배열로 만들어 줌
-   [1, 2, 3배열을 세 번 복제한 뒤 통합한 배열 만들기](./src/ap-test3.ts)
