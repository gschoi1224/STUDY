# 모나드

-   카테고리 이론에서 사용되는 일종의 코드 설계 패턴

## 모나드의 이해

### 타입 클래스

```ts
// b가 map이라는 메서드를 가졌다는 가정으로 구현됨
const callMap = fn => b => b.map(fn);
callMap(a => a + 1)([1]); // 정상 실행
callMap(a => a + 1)(1); // 비정상 종료
// 이를 방지하기 위해 b가 반드시 map 메서드가 있는 타입이라고 타입을 제한
const callMap =
    <T, U>(fn: (T) => U) =>
    <T extends { map(fn) }>(b: T) =>
        b.map(fn);
```

-   보통 객체지향 언어에서는 클래스를 만들고 메서드를 구현하는 식으로 설계하지만 모나드 방식 설계는 반드시 필요한 메서드를 지정하는 클래스를 만든다

```ts
class Monad<T> {
    constructor(public value: T) {}
    static of<U>(value: U): Monad<U> {
        return new Monad<U>(value);
    }
    map<U>(fn: (x: T) => U): Monad<U> {
        return new Monad<U>(fn(this.value));
    }
}

const callMonad = fn => b => Monad.of(b).map(fn).value;
```

-   타입 클래스는 함수를 만들 때 특별한 타입으로 제약하지 않아도 됨
-   타입에 따른 안정성을 보장하면서도 코드의 재사용성이 뛰어난 범용 함수를 쉽게 만들 수 있음

```ts
callMonad((a: number) => a + 1)(1); // 2
callMonad((a: number[]) => a.map(value => value + 1))([1, 2, 3]); // [2, 3, 4]
```

### 고차 타입

-   Monad<T>처럼 타입 T를 한 단계 더 높은 타입으로 변환하는 용도의 타입을 `고차 타입`이라고 함

### 모나드 룰

-   왼쪽 법칙: M.of(a).chain(f) == f(a)
-   오른쪽 법칙: m.chain(M.of) == m

## Identity 모나드

### identity

-   함수형 프로그래밍에서 identity는 항상 매개변수로 들어온 값을 그대로 반환해주는 의미의 함수를 뜻함
-   카테고리 이론에서는 자신의 타입에서 다른 타입으로 갔다가 돌아올 때 값이 변경되지 않는 카테고리를 의미
