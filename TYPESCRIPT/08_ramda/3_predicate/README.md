# 서술자와 조건 연산

## 서술자

-   boolean 타입 값을 반환해 어떤 조건을 만족하는지를 판단하는 함수
-   람다는 수를 비교해 true나 false를 반환하는 서술자들을 제공함

```ts
R.lt(a)(b); // a < b면 true
R.lte(a)(b); // a <= b면 true
R.gt(a)(b); // a > b면 true
R.gte(a)(b); // a >= b면 true
```

## R.allPass

-   R.lte, R.gt 처럼 boolean 타입의 값을 반환하는 함수들은 R.allPass 와 R.anyPass 라는 함수를 통해 결합할 수 있음

```ts
R.allPass(서술자 배열)  // 배열의 조건을 모두 만족하면 true
R.anyPass(서술자 배열)  // 배열의 조건을 하나라도 만족하면 true
```

## R.ifElse 함수

-   세 가지 매개변수를 포함하며, 첫 번째는 true/false를 반환하는 서술자를, 두 번째는 선택자가 true를 반환할 때 실행할 함수를, 세 번째는 선택자가 false를 반환할 때 실행할 함수
-   [R.ifElse를 사용해 1부터 10까지 수에서 중간값 6보다 작은 수는 1씩 감소시키고, 같거나 큰 수는 1씩 증가시키는 예](./src/ifElse.ts)
