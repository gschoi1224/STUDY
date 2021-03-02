import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";
import ErrorBoundary from "./ErrorBoundary";

// 랜덤 색상을 생성합니다.
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
  // 16777215를 hex로 표현하면 ffffff가 됨
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}> 랜덤 색상 </button>{" "}
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color} />{" "}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
// React StrictMod가 적용되어 있으면 일부 라이프사이클이 두 번씩 호출됨. (개발환경에서만)
// 제거하려면 index.js에서
