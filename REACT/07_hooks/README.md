# Hooks

Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 렌더링 직후 작업을 설정하는 useEffect 등의 기능을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해 줌

## useState

- 가장 기본적인 Hook이며, 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해 줌
- useState 함수의 파라미터에는 상태의 기본값을 넣어 줌
- 이 함수가 호출되면 배열을 반환하는데 첫 번재 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수

```javascript
const [value, setValue] = useState(기본값);
```

## useEffect

- 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
- 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방함
- **마운드될 때만 실행하고 싶을 때**

```javascript
useEffect(() => {
  console.log("마운트될 때만 실행");
}, []);
```

- **특정 값이 업데이트될 때만 실행**

```javascript
useEffect(() => {
  console.log(`${name}이 업데이트될 때만 실행`);
}, [name]);
```

- **컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 수행하고 싶으면 useEffect에서 뒷정리(cleanup) 함수를 반환**
  - 렌더링될 때마다 뒷정리 함수가 계속 나타남, 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여줌

```javascript
useEffect(() => {
  console.log("effect");
  return () => {
    console.log("cleanup");
  };
}, [name]);
```

- 오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번재 파라미터에 비어 있는 배열을 넣으면 됨

```javascript
useEffect(() => {
  console.log("effect");
  return () => {
    console.log("unmount");
  };
});
```

## useReducer

- useState보다 더 다양한 컴포넌트 상화엥 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook
- 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션(action)값을 전달 받아 새로운 상태를 반환하는 함수
- 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번재 파라미터에는 해당 리듀서의 기본값을 넣어 줌
- 이 Hook을 사용하면 state(현재 가리키고 있는 상태) 값과 dispatch(액션을 발생시키는 함수) 함수를 받아 오며, dispatch(action)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조
- 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 꺼낼 수 있다는 점
- 리듀서 함수

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환
    default:
      return state; // 아무것도 해당되지 않을 때 기존 상태 반환
  }
}
```

- 호출부

```javascript
const [state, dispatch] = useReducer(reducer, { value: 0 });
<button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>;
```

### input 여러 개 관리

- useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해 준 것과 유사한 방식으로 작업을 처리할 수 있음
- 리듀서 함수

```javascript
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}
```

- Hook 사용

```javascript
const [state, dispatch] = useReducer(reducer, {
  name: "",
  nickname: "",
});
const { name, nickname } = state;
const onChange = (e) => {
  dispatch(e.target);
};
```

## useMemo

- 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있음.
- 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식

```javascript
const getSum = (numbers) => {
  return numbers.reduce((a, b) => a + b);
};
const sum = useMemo(() => getSum(list), [list]); // list 배열의 내용이 바뀔 때만 getAverage 함수가 호출됨
```

## useCallback

- useMemo와 비슷하고 주로 렌더링 성능을 최적화해야 하는 상황에서 사용
- 만들어 놨던 함수를 재사용할 수 있음
- useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야하는지 배열에 명시해서 제시
- 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며, 특정 값을 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 됨
- 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 함.

```javascript
const onChange = useCallback((e) => {
  setNumber(e.target.value);
}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
const onInsert = useCallback(() => {
  const nextList = list.concat(parseInt(number));
  setList(nextList);
  setNumber("");
}, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성, 함수 안에서 참조했기 때문에 반드시 명시해야 함!
```

## useRef

- 함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해 줌.
- useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴.

```javascript
const inputEl = useRef(null);
const onChange = useCallback((e) => {
  inputEl.current.focus();
}, []);
<input ref={inputEl} />;
```

- **로컬 변수(렌더링과 상관없이 바뀔 수 있는 값)를 사용해야 할 때도 사용할 수 있음**
  - ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않음!! 렌더링과 관련되지 않은 값을 관리할 때만 사용하도록 유의!

```javascript
const id = useRef(1);
const setId = (n) => {
  id.current = n;
};
```
