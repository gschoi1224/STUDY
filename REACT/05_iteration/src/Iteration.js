import React, { useState } from "react";

const Iteration = () => {
  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const handleClick = (e) => {
    e.preventDefault();
    //names.push({ id: nextId, text: inputText });
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    // push를 사용하지 않고 concat을 사용하는 이유 :
    // 리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 함 이를 불변성 유지라고 함
    // 불변성 유지를 해 주어야 나중에 리액트 컴포넌트의 성능을 최적화할 수 있음.
    setNames(nextNames); // names 값을 업데이트한다.
    setNextId(nextId + 1);
    setInputText("");
  };

  const onRemove = (id) => {
    // 제거할 때는 filter 함수 사용
    console.log(id);
    const removeNames = names.filter((name) => name.id !== id);
    setNames(removeNames);
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const nameList = names.map((name) => (
    <li
      key={name.id}
      onClick={() => {
        onRemove(name.id);
      }}
    >
      {name.text}
    </li>
  ));
  return (
    <div>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>등록</button>
      <ul>{nameList}</ul>
    </div>
  );
};

export default Iteration;
