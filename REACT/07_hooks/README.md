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
