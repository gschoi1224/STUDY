# 라이프사이클 메서드

- 종류는 총 아홉 가지
- Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드
- Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드
- 마운트, 업데이트, 언마운트 카테고리로 나눔

## 마운트

- DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트라고 함
  1. constructor : 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드
  2. getDerivedStateFromProps : props에 있는 값을 state에 넣을 때 사용하는 메서드
  3. render : UI를 렌더링하는 메서드
  4. componentDidMount : 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드

## 업데이트

- 컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트 함
  1. props가 바뀔 때
  2. state가 바뀔 때
  3. 부모 컴포넌트가 리렌더링될 때
  4. this.forceUpdate로 강제로 렌더링을 트리거할 때
- 메서드 종류
  1. getDerivedStateFromProps : 이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출됨. props의 변화에 따라 state 값에도 변화를 주고 싶을 때 사용
  2. shouldComponentUpdate : 컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정하는 메서드, true 혹은 false 값을 반환해야 하며, true를 반환하면 다음 라이프사이클 메서드를 계속 실행하고 false를 반환하면 작업을 중지함(컴포넌트가 리렌더링되지 않음) 만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수를 호출함.
  3. render : 컴포넌트를 리렌더링함
  4. getSnapshopBeforeUpdate : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메서드
  5. componentDidUpdate : 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드 \* 언마운트 : 마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것
  6. componentWillUnmount : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드

### render() 함수

- 컴포넌트 모양새를 정의. 라이프사이클 메서드 중 유일한 필수 메서드.
- 이 메서드 안에서 this.props와 this.state에 접근할 수 있음
- 이 메서드 안에서는 이벤트 설정이 아닌 곳에서 setState를 사용하면 안 되며, DOM에 접근해서도 안 됨.
- DOM 정보를 가져오거나 state에 변화를 줄 때는 componentDidMount에서 처리해야 함

### constructor 메서드

- 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행됨. 이 메서드에서는 초기 state를 정할 수 있음

### getDerivedStateFromProps 메서드

- 리액트 v16.3 이후에 새로 만든 라이프사이클 메서드로 props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트될 때 호출됨.
- 예)

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) { // 조건에 따라 특정 값 동기화
        return { value : nextProps.value };
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
}
```

### componentDidMount 메서드

- 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행함.
- 이 안에서 다른 JS 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimtout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 됨.

### shouldComponentUpdate 메서드

- props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드
- 반드시 true 값 또는 false 값을 반환해야 함.
- 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 true 값 반환

### shouldComponentUpdate(nextProps, nextState)

- 현재 props와 state는 this.props와 this.state로 접근하고, 새로 설정될 props 또는 state는 nextProps와 nextState로 접근 가능

### getSnapshotBeforeUpdate 메서드

- render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됨.
- 이 메서드에서 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있음
- 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됨(예 : 스크롤바 위치 유지)
- 예)

```javascript
getSnapshopBeforeUpdate(prevProps, prevState) {
    if (preveState.array !== this.state.array) {
        const { scrollTop, scrollHeight } = this.list;
        return { scrollTop, scrollHeight };
    }
}
```

### componentDidUpdate 메서드

> componentDidUpdate(prevProps, prevState, snapshot) {...}

- 렌더링을 완료한 후 실행. 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 무방함.
- prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음.
- getsnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있음.

### componentWillUnmount 메서드

> componentWillUnmount() {...}

- 컴포넌트를 DOM에서 제거할 때 실행함.
- componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 함.

### componentDidCatch 메서드

- 컴포넌트 렌더링 도중에 에러가 발생했을 때 애플리케이션이 먹통이 되지 않고 오류 UI를 보여 줄 수 있게 해줌.
- 예)

```javascript
componentDidCatch(err, info) {
    this.setState({
        err : true
    });
    console.log({ err, info })
}
```

- 여기서 err는 파라미터에 어떤 에러가 발생했는지 알려 주며, info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보
  컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고, 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있음
