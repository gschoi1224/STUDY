import React, { Component } from "react";

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          onChange={(e) => {
            // e : SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체
            // 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화되므로 정보를 참조할 수 없음
            // 비동기적으로 이벤트 객체를 참조할 일이 있다면 e.persist() 함수를 호출해 주어야 함
            console.log(e);
            console.log(e.target);
            console.log(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default EventPractice;
