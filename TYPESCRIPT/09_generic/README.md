# 제네릭 프로그래밍

## 제네릭 타입

-   제네릭 타입은 인터페이스나 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능
-   해당 심벌의 타입을 미리 지정하지 않고 다양한 타입에 대응하려고 할 때 사용
-   인터페이스에서 타입을 특정하지 않고 T로 지정해 제네릭 타입을 만들 수 있으며 이름 뒤에 <T>처럼 표기
-   [인터페이스에서 제네릭 타입 사용](./src/IValuable.ts)

```ts
interface IGeneric<T> {
    val: T;
}
```

-   [클래스에서 제네릭 타입 사용](./src/Valuable.ts)

```ts
class Generic<T> {
    constructor(public val: T) {}
}
```

-   [함수에서 제네릭 타입 사용](./src/printValue.ts)

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

-   타입 별칭에서 제네릭 타입 사용

```ts
type IGeneric<T> = {
    val: T;
};
```

## 제네릭 타입 제약

-   타입 변수에 적용할 수 있는 타입의 범위를 한정하는 기능
-   <최종 타입1 extend 타입1, 최종타입2 extend 타입2>(a: 최종 타입1, b: 최종 타입2, ...) {}
-   [제네릭 타입 제약 구문 예](./src/printValueT.ts)
-   매개변수 타입을 어떤 방식으로 제약하느냐만 다를 뿐 사용법은 같음

## new 타입 제약

-   팩토리 함수: 객체를 생성하는 방법이 지나치게 복잡할 때 단순화하려는 목적으로 구현하는 new 연산자를 사용해 객체를 생성하는 기능을 하는 함수

```ts
// 타입의 타입을 지정하여 타입 생성
const create = <T>(type: T): T => new type()    // 타입의 타입을 허용하지 않아서 오류 발생
// C# 의 구문을 빌려 타입스크립트 구문으로 만들기
const create = <T extends {new(): T}>(type T): T => new type()
// 중괄호로 new() 부분을 메서드 형태로 표현
const create = <T>(type: new() => T): T => new type()
// new 연산자를 type에 적용하면서 type의 생성자 쪽으로 매개변수를 전달해야 할 때 사용
const create = <T>(type: {new(...args): T}, ...args): T => new type(...args)
```

-   [예시](./src/create.ts)

## 인덱스 타입 제약

-   [객체의 일정 속성들만 좀 더 단순한 객체를 만들어야 할 때 사용하는 함수](./src/pick.ts)
-   속성의 타입을 문자열 형식으로 전달할 때 오타가 나면 undefined가 발생
-   이런 상황을 방지하기 위해 keyof T 형태로 타입 제약을 설정할 수 있는데 이것을 `인덱스 타입 제약`이라 함
