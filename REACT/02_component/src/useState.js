import React, { useState } from "react";

const Say = () => {
  const [message, setMessage] = useState(""); // useState 함수의 인자는 상태의 초깃값,
  // 함수를 호출하면 배열이 반환되는데 첫 번째 원소는 현재 상태, 두 번째 원소는 상태를 바꾸어주는 setter 함수
  const onClickEnter = () => setMessage("안녕하세요!");
  const onClickLeave = () => setMessage("안녕히 가세요!");

  const [color, setColor] = useState("black");

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: "red" }} onClick={() => setColor("red")}>
        빨간색
      </button>
      <button style={{ color: "green" }} onClick={() => setColor("green")}>
        초록색
      </button>
      <button style={{ color: "blue" }} onClick={() => setColor("blue")}>
        파란색
      </button>
    </div>
  );
};

export default Say;
