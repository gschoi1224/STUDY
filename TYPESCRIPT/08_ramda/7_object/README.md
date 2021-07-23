# 객체 다루기

## R.toParis, R.fromParis

-   R.toParis: 객체의 속성들을 분해해 배열로 만들어 주며 이때 배열의 각 아이템은 [string, any] 타입의 튜플 [(예)](./src/toParis-test.ts)
-   R.fromParis: [키:값] 형태의 아이템을 가진 배열을 다시 객체로 만들어 줌 [(예)](./src/fromParis-test.ts)

## R.keys, R.values

-   R.keys: 객체의 속성 이름만 추려서 string[] 타입의 배열로 반환[(예)](./src/keys-test.ts)
-   R.values: 객체의 속성값만 추려서 any[] 타입 배열로 반환[(예)](./src/values-test.ts)

## R.zipObj

-   '키 배열'과 '값 배열' 두 가지 매개변수를 결합해 객체로 만들어 줌
-   객체 = R.zipObj(키 배열, 값 배열)
-   [예시](./src/zipObj-test.ts)

## R.mergeLeft, R.mergeRight

-   두 개의 객체를 입력받아 두 객체의 속성들을 결합해 새로운 객체를 생성
-   R.mergeLeft(객체1)(객체2): 속성값이 다를 경우 왼쪽 객체의 우선순위가 높음[(예)](./src/mergeLeft-test.ts)
-   R.mergeRight(객체1)(객체2): 속성값이 다를 경우 오른쪽 객체의 우선순위가 높음[(예)](./src/mergeRight-test.ts)

## R.mergeDeepLeft, R.mergeDeepRight

-   R.mergeLeft와 R.mergeRight가 객체의 속성에 담긴 객체를 바꾸지는 못하는 것을 가능하게 만드는 함수
-   [예시](./src/mergeDeepRight-test.ts)
