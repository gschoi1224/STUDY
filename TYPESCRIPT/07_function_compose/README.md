# 함수 조합의 원리와 응용

## 함수형 프로그래밍

-   함수형 프로그래밍의 기반이 되는 수학 이론

1. `람다 수학` : 조합 논리와 카테고리 이론의 토대가 되는 논리 수학
2. `조합 논리` : 함수 조합의 이론적 배경
3. `카테고리 이론` : 모나드 조합과 고차 타입의 이론적 배경

## 제네릭 함수

-   타입스크립트의 함수는 매개변수와 반환값에 타입이 존재하므로, 함수 조합을 구현할 때는 제네릭 함수 구문을 사용해야만 함.

### 제네릭 함수 구문

-   타입스크립트에서 제네릭 타입은 함수와 인터페이스, 클래스, 타입 별칭에 적용할 수 있으며, 꺾쇠 괄호 <>로 타입을 감싸서 표현한다.
-   function 키워드

```ts
function g1<T, Q>(a: T, b: Q): void {}
```

-   화살표 함수

```ts
const g2<T, Q>(a: T, b: Q): void => {}
```

-   타입 별칭에 제네릭 타입 적용

```ts
type TypeFunc<T, Q, R> = (T, Q) => R; // T와 Q 타입 값을 입력 받아 R 타입 값을 반환
```

### 아이덴티티 합수

-   입력값을 가공 없이 그대로 반환하고 입력과 출력 타입이 같은 함수 이름에는 보통 identity 혹은 I 라는 단어가 포함됨.

```ts
type MapFunc<T, R> = (T) => R
type IdentityFunc<T> = MapFunc<T, T>
const numberIdentity = IdentityFunc<number> = (x: number): number => x
```

## 고차 함수와 커리

### 고차 함수

-   타입스크립트에서의 함수는 변수에 담긴 함수 표현식이고, 함수 표현식은 일종의 값이므로 함수의 반환값으로 함수를 사용할 수 있음
-   어떤 함수가 또 다른 함수를 반환할 때 그 함수를 `고차 함수`라고 함
-   1차 함수: 함수가 아닌 단순히 값을 반환하는 함수
-   2차 함수: 1차 함수를 반환
-   3차 함수: 2차 함수를 반환

```ts
type FirstFx<T, R> = (T) => R;
type secondFx<T, R> = (T) => FirstFX<T, R>;
type thirdFx<T, R> = (T) => SecondFx<T, R>;
```

-   커리 : fx(1)(2) 처럼 함수 호출 연산자를 두 번 연속해서 사용하는 것을 `커리(curry)`라고 함

```ts
const fx = thirdFx<number, number> =
    (x: number): SecondFx<number, number> =>
    (y: number): FirstFx<number, number> =>
    (z: number): number => x + y + z

console.log(fx(1)(2)(3))   // 6
```

### 부분 적용 함수

-   자신의 차수보다 함수 호출 연산자를 덜 사용하면 `부분 적용 함수` 또는 `부분 함수`라고 함

```ts
const fx2: secondFx<number, number> => fx(1)
const fx1 : firstFx<number, number> => fx2(2)
console.log(
    fx1(3), // 6
    fx2(2)(3),  // 6
    fx(1)(2)(3) // 6
)
```

### 클로저

-   `지속되는 유효 범위`

```ts
function fx(x: number): number => number {  // 바깥족 유효 범위 시작
    return function(y: number): number{ // 안쪽 유효 범위 시작
        return x + y    // 클로저
    }   // 안쪽 유효 범위 끝
}      // 바깥쪽 유효 범위 끝
const fx1 = fx(1)   // 변수 x 메모리 유지
const result = fx1(2)   // result에 3 저장 후 변수 x 메모리 해제
```

## 함수 조합

-   작은 기능을 구현한 함수를 여러 번 조합해 더 의미 있는 함수를 만들어 내는 프로그램 설계 기법
-   compose 혹은 pipe라는 이름의 함수를 제공하거나 만들 수 있음

### compose 함수

-   가변 인수 스타일로 함수들의 배열을 입력받고 함수들을 조합해 매개변수 x를 입력받는 1차 함수를 반환함.
-   compose(h, g, f)는 f ~> g ~> h ~> 와 같음

### pipe 함수

-   compose와 동작 원리는 같지만 매개변수들을 해석하는 순서가 반대임

### 동작 원리

-   pipe와 compose의 매개변수로 들어오는 가변 인수 functions의 타입을 설정하기 어려워 이들을 모두 포함할 수 있는 제네릭 타입을 지정하기가 힘들기 때문에 functions은 자바스크립트 타입 Function들의 배열인 Function[]으로 설정
-   functions 배열을 조합해 어떤 함수를 반환해야 하므로 반환 타입은 Function으로 설정
-   조합된 결과 함수는 애리티가 1이기 때문에 매개변수 x를 입력받는 함수를 작성, 제네릭 타입으로 표현하면 타입 T의 값 x를 입력 받아 (T) => R 타입의 함수를 반환하는 것
-   reduce 메서드를 사용해 매개변수로 들어온 함수들 조합
-   h(g(f(x)))를 만들 때 reduce 메서드의 진행 순서

1. value: x, func: f, 결과: f(x)
2. value: f(x), func: g, 결과: g(f(x))
3. value: g(f(x)), func: h, 결과: h(g(f(x)))

### 포인트가 없는 함수

-   [map 함수](./src/map.ts), [squaredMap함수](./src/squareMap.ts)
-   함수 조합을 고려해 설계한 함수
-   타입 암시를 원할 때는 ts 파일 맨 위에 `// @ts-nocheck` 넣기!
