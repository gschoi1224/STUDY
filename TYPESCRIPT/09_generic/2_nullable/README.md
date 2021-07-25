# nullable

-   자바스크립트와 타입스크립트에서 null과 undefined는 사실상 호환됨
-   undefined 타입 변수에 null 값을 지정할 수 있고 null 타입 변수에 undefined를 지정할 수 있지만 다른 타입은 지정할 수 없음

```ts
type nullable = undefined | null;
const nullable: nullable = undefined;
```

-   nullable 타입들을 프로그램이 동작할 때 비정상으로 종료시키는 주요 원인이 됨

## 옵션 체이닝 연산자

-   물음표 기호와 점 기호를 연이어 쓰는 ?. 연산자(타입스크립트 버전 3.7.2부터 지원)
-   [예시](./src/optional-chainging-operator.ts)

## 널 병합 연산자

-   물음표 기호를 두 개 연달아 이어 붙인 연산자
-   [예시](./src/nullish-coalescing-operator.ts)
