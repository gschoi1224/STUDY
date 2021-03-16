// useState는 가장 기본적인 Hook이며 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해 줌.

import React, { useState } from "react";
const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>
        현재 카운터 값은 <b> {value} </b>입니다.{" "}
      </p>{" "}
      <button onClick={() => setValue(value + 1)}> +1 </button>{" "}
      <button onClick={() => setValue(value - 1)}> -1 </button>{" "}
    </div>
  );
};

export default Counter;
