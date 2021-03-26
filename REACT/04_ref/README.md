# ref

DOM에 이름 달기

### 리액트 컴포넌트 안에서 id를 사용하면 안 되는 이유

- 같은 컴포넌트를 여러 번 사용할 때 HTML에서 DOM의 id는 유일해야 하는데, 이런 상황에서 중복 id를 가진 DOM이 여러 개 나옴
- ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 자곧ㅇ하기 때문에 이런 문제가 생기지 않음
- 다른 라이브러라니 프레임워크와 함께 사용할 때 id를 사용할 수 밖에 없는 상황에는 뒷부분에 추가 텍스트를 붙여서(예 : button01, button02, ...) 중복 id가 발생하는 것을 방지해야 함

## ref를 사용해야 하는 상황

- **DOM을 직접적으로 건드려야 할 때**
  - 특정 input에 포커스 주기
  - Canvas 요소에 그림 그리기

## ref 사용 방법

- 콜백 함수를 통한 ref 설정
  - ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해주기
  - 이 콜백 함수는 ref 값을 파라미터로 전달받음
  - 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해주기
  ```html
  <input ref={(ref) => {this.input=ref}} />
  ```
  - 이름은 DOM 타입과 관계 없이 this.superman = ref 처럼 마음대로 지정 가능
- createRef를 통한 ref 설정

  - 리액트에 내장되어 있는 createRef 라는 함수를 사용하는 방법
  - 리액트 v16.3 부터 도입되었으며 이전 버전에서는 작동하지 않음
  - 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어 주면 끝
  - 나중에 ref를 설정해 준 DOM에 접근하려면 this.input.**current**를 조회하면 됨

  ```javascript
  input = React.createRef();

  handleFocus = () => {
      this.input.current.focus();
  }

  render() {
      return (
          <div><input ref={this.input}></div>
      );
  }
  ```

## 컴포넌트에 ref 달기

- 이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씀
- 사용법

```javascript
<MyComponent
  ref={(ref) => {
    this.myComponent = ref;
  }}
/>
```

- 이렇게 하면 내부의 메서드 및 멤버 변수에도 접근할 수 있음(myComponent.handleClick, myComponent.input 등)

## 정리

- 컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용(먼저 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 고려하기!)
- 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용하면 안 됨!
- 컴포넌트끼리 데이터를 교류할 때는 언제나 데이터를 부모↔자식 흐름으로 교류해야 함
- 함수형 컴포넌트에서는 useRef라는 Hook 함수를 이용
