# immer 사용법

```js
import produce from 'immer';
const nextState = produce(originalState, (draft) => {
  // 바꾸고 싶은 값 바꾸기
  draft.somewhere.deep.inside = 5;
});
```

- produce(수정하고 싶은 상태, 상태를 어떻게 업데이트할지 정의하는 함수) 형식으로 사용
- 두 번째 파라미터로 전달되는 함수 내부에서 원하는 값을 변경하면 produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성
- 핵심은 불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것

## 복잡한 데이터를 불변성을 유지하면서 업데이트 하는 예시)

```js
import produce from 'immer';

const originalState = [
  {
    id: 1,
    todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
    checked: true,
  },
  {
    id: 2,
    todo: 'immer로 불변성 유지하기',
    checked: false,
  },
];
const nextState = produce(originalState, (draft) => {
  // id가 2인 항목의 checked 값을 true로 설정
  const todo = draft.find((t) => t.id === 2); // id로 항목 찾기
  todo.checked = true;
  // 혹은 draft[1].checked = true;

  // 배열에 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: '일정 관리 앱에 immer 적용하기',
    chekced: false,
  });

  // id = 1인 항목을 제거하기
  draft.splice(
    draft.findIndex((t) => t.id === 1),
    1,
  );
});
```

## useState의 함수형 업데이트와 immer 함께 쓰기

- useState의 함수형 업데이트 예시)

```js
const [number, setNumber] = useState(0);
// prevNumbers는 현재 number 값을 가리킵니다.
const onIncrease = useCallback(
  () => setNumber((prevNumber) => prevNumber + 1),
  [],
);
```

- immer에서 제공하는 produce 함수를 호출할 때 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환함)

```js
const update = produce((draft) => {
  draft.value = 2;
});
const originalState = {
  value: 1,
  foo: 'bar',
};
const nextState = update(originalState);
console.log(nextstate); // { value : 2, foo : 'bar' }
```
