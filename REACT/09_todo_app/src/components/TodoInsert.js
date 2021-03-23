import React, { useCallback, useState } from "react";
import { MdAdd } from "react-icons/md"; // https://react-icons.github.io/react-icons/#/icons/md 아이콘 이름 import 해서 사용
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e) => {
    // 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라 재사용 가능하도록
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(""); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
      // 이를 방지하기 위해 이 함수를 호출합니다.
      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />
      <button type="submit">
        <MdAdd />
      </button>{" "}
    </form>
  );
};

export default TodoInsert;
