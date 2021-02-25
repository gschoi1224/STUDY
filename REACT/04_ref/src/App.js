import React, { Component } from "react";
import ScrollBox from "./ScrollBox";

// MyComponent ref = {ref => {this.MyComponent=ref}} 컴포넌트에 ref 달기
class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox
          ref={(ref) => {
            this.box = ref;
          }}
        />
        <button
          onClick={() => {
            this.box.scrollToBottomm();
          }}
        >
          아래로 내리기
        </button>
      </div>
    );
  }
}

export default App;
