import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  //const nameList = names.map((name) => <li>{name}</li>);
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{nameList}</ul>;
  // Warning : Each child in a list should have a unique "key" prop.
  // 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용함 고윳값 써야됨
};

export default IterationSample;
