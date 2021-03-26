# 컴포넌트(Component)

데이터가 주어졌을 때 이에 맞추어 UI를 만들어 주는 것은 물론이고, 라이프사이클 API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있으며, 임의 메서드를 만들어 특별한 기능을 붙여줄 수 있음.

## 클래스형 컴포넌트 (rcc 간편 입력)

- state 기능 및 라이프사이클 기능을 사용할 수 있고 임의 메서드를 정의할 수 있음
- render 함수가 꼭 있어야 하고, 그 안에서 보여 주어야 할 JSX를 반환해야 함

```javascript
import React, { Component } from "react";

class README extends Component {
  render() {
    return <div></div>;
  }
}

export default README;
```

## 함수형 컴포넌트 (rsc 간편 입력)

- 클래스형 컴포넌트보다 선언하기가 훨씬 편함
- 메모리 자원도 클래스형 컴포넌트보다 덜 사용함.
- state와 라이프사이클 API의 사용이 불가능함. (리액트 v16.8 업데이트 이후 Hooks라는 기능이 도입되면서 해결)

```javascript
import React from "react";

const README = () => {
  return <div></div>;
};

export default README;
```

공식 메뉴얼에서는 컴포넌트를 새로 작성할 때 함수형 컴포넌트와 Hooks를 사용하도록 권장

### 컴포넌트 만들기

1. 파일 만들기
2. 코드 작성하기
3. 모듈 내보내기 및 불러오기

JSX 내부에서 props 렌더링 - props 값은 컴포넌트 함수의 파라미터로 받아 와서 사용할 수 있음.

### PropTypes 종류

- array : 배열
- arrayOf(다른 PropType) : 특정 PropType으로 이루어진 배열
- bool : true 혹은 false 값
- func : 함수
- number : 숫자
- object : 객체
- string : 문자열
- symbol : ES6의 symbol
- node : 렌더링할 수 있는 모든 것(숫자, 문자열, 혹은 JSX 코드. children도 node PropType)
- istanceOf(클래스) : 특정 클래스의 인스턴스
- oneOf(['dog', 'cat']) : 주어진 배열 요소 중 값 하나
- oneOfType([React.PropTypes.string, PropTypes.number]) : 주어진 배열 안의 종류 중 하나
- objectOf(React.PropTypes.number) : 객체의 모든 키 값이 인자로 주어진 PropType인 객체
- shape({ name : PropTypes.string, num : PropTypes.number }) : 주어진 스키마를 가진 객체
- any : 아무 종류

# state

- 컴포넌트 내부에서 바뀔 수 있는 값
- 클래스형 컴포넌트가 지니고 있는 state와 함수형 컴포넌트의 useState 라는 함수를 통해 사용하는 state

```javascript
this.setState((기존 상태, 현재 지니고 있는 props) => {})
```

- 주의사항 : **state 값을 바꿀 때는 setState 혹은 useState를 통해 전달받은 세터 함수를 사용해야 함**
- 잘못된 예)

```javascript
// 클래스형 컴포넌트에서
this.state.number = this.state.number + 1;
this.state.array = this.array.push(2);
this.state.object.value = 5;
```

```javascript
// 함수형 컴포넌트에서
const [object, setObject] = useState({ a: 1, b: 1 });
object.b = 2;
```

- 배열이나 객체를 업데이트해야 할 때는 사본을 만들고 그 사본에 값을 업데이트한 후, 그 사본의 상태를 setState 혹은 세터 함수를 통해 업데이트
- 예)

```javascript
// 객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...object, b: 2 }; // 사본을 만들어서 b 값만 덮어 쓰기
```

```javascript
// 배열 다루기
const array = [
    { id : 1, value : true },
    { id : 2, value : true },
    { id : 3, value = false }
];
let nextArray = array.concat({ id : 4 });   // 새 항목 추가
nextArray.filter(item => item.id !== 2);    // id가 2인 항목 제거
nextArray.map(item => (item.id === 1 ? { ...item, value : false } : item)); // id가 1인 항목의 value를 false로 설정
```

## 정리

- props와 state는 둘 다 컴포넌트에서 사용하거나 렌더링할 데이터를 담고 있으므로 비슷해 보일 수 있음
- props는 부모 컴포넌트가 설정하고, state는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트할 수 있음.
- 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메서드를 호출하면 props도 유동적으로 사용할 수 있음
- useState를 사용하는 것을 권장
