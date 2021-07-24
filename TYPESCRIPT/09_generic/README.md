# 제네릭 프로그래밍

## 이해

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
