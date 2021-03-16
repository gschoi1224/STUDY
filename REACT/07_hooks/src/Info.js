import React from "react";
import useInputs from "./CustomHooks";

const Info = () => {
  //const [name, setName] = useState("");
  //const [nickname, setNickname] = useState("");

  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;
  /*
  useEffect(() => {
    // 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
    // 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방함.
    console.log("렌더링이 완료되었습니다!");
    console.log({
      name,
      nickname,
    });
  });
  useEffect(() => {
      console.log("마운트될 때만 실행됩니다.");
    }, []);
*/

  // 특정 값을 업데이트할 때만 실행하고 싶을 때
  /*
  useEffect(() => {
    console.log(name);
  }, [name]); // name 값이 업데이트 될 때만 실행
*/

  // 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 실행하고 싶으면
  // useEffect에서 뒷정리(cleanup)함수를 반환해주면됨
  /*
  useEffect(() => {
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, [name]);
  */
  // 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 됨
  /**
   * useEffect(() => {
   *    console.log('effect');
   *    return () => {
   *        console.log('unmount);
   *    };
   * }, []);
   */

  /*
    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };
    */

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />{" "}
        <input name="nickname" value={nickname} onChange={onChange} />{" "}
      </div>{" "}
      <div>
        <div>
          <b> 이름: </b> {name} <b> 닉네임: </b> {nickname}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Info;
