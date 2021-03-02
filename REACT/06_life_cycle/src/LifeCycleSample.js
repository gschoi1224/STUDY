import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  constructor(props) {
    super(props);
    console.log(
      "constructor : 컴포넌트의 생성자로 컴포넌트를 만들 때 처음으로 실행됨"
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 부모에게서 받은 color 값을 state에 동기화
    console.log(
      "getDerivedStateFromProps : props로 받아 온 값을 state에 동기화시키는 용도로 사용. 컴포넌트가 마운트될 때와 업데이트될 때 호출"
    );
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log(
      "componentDidMount : 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행함. 이 안에서 비동기 작업 처리하면 됨"
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "shouldComponentUpdate : props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드",
      nextProps,
      nextState
    );
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log(
      "componentWillUnmount : 컾모넌트를 DOM에서 제거할 때 실행, componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야함"
    );
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환
    console.log(
      "getSnapshotBeforeUpdate : render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출"
    );
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "componentDidUpdate : 리렌더링을 완료한 후 실행함. 컴포넌트가 이전에 가졌던 데이터에 접근할 수 있음",
      prevProps,
      prevState
    );
    if (snapshot) console.log("업데이트 되기 직전 색상 : ", snapshot);
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        {this.props.missing.value}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {" "}
          {this.state.number}{" "}
        </h1>{" "}
        <p> color: {this.state.color} </p>{" "}
        <button onClick={this.handleClick}> 더하기 </button>{" "}
      </div>
    );
  }
}

export default LifeCycleSample;
