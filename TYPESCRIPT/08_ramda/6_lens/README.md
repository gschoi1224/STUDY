# 렌즈

-   하스켈 언어의 Control.Lens 라이브러리 내용 중 js에서 동작할 수 있는 게터와 세터 기능만을 람다 함수로 구현한 것
-   렌즈 진행 과정

1. R.lens 함수로 객체의 특정 속성에 대한 렌즈를 만든다.
2. 렌즈를 R.view 함수에 적용해 속성값을 얻는다
3. 렌즈를 R.set 함수에 적용해 속성값이 바뀐 새로운 객체를 얻는다.
4. 렌즈와 속성값을 바꾸는 함수를 R.over 함수에 적용해 값이 바뀐 새로운 객체를 얻는다.

## R.prop

-   property의 앞 네 글자를 따서 만든 이름
-   객체의 특정 속성값을 가져오는 함수
-   `게터(getter)`라고 함
-   [사용예](./src/prop.ts)

## R.assoc

-   associate의 앞 다섯 글자를 따서 만든 이름
-   객체의 특정 속성값을 변경할 때 사용
-   `세터(setter)`라고 함
-   [사용예](./src/assoc.ts)

## R.lens 함수

-   R.lens, R.prop, R.assoc의 조합으로 만들 수 있음

```ts
const makeLens = (propName: string) =>
    R.lens(R.prop(propName), R.assoc(propName));
```

## R.view, R.set, R.over

-   렌즈를 적용해 게터와 세터 등 함수를 만들 수 있음
-   [예시](./src/lens.ts)

## R.lensPath

-   긴 경로의 속성을 렌즈로 만들 때 사용
-   렌즈 = R.lensPath(['location', 'coordinates', 'longitude'])
-   [예시](./src/lensPath-test.ts)
