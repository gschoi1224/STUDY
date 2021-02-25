import React, { Component } from "react";
import "./ValidationSample.css";

// state 만으로 해결할 수 없고 DOM을 꼭 사용해야 하는 상황
// 특정 input에 포커스 주기
// 스크롤 박스 조작하기
// Canvas 요소에 그림 그리기 등

// 1. 콜백 함수를 통한 ref 설정
// ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해 주면 됨.
// 콜백 함수의 파라미터로 준 값을 컴포넌트의 멤버 변수로 설정해 줌
// <input ref={ ref => { this.input = ref } } />
// 이렇게 하면 this.input은 input 요소의 DOM을 가리킴 ref의 이름은 원하는 것으로 자유롭게 지정할 수 있음

// 2. createRef를 통한 ref 설정
// 리액트 내장 객체인 createRef를 사용
class RefSample extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefSample;
