# JSX

- 자바스크립트의 확장 문법이며 XML과 매우 비슷하게 생김.
- 브라우저에서 실행 되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환됨
- 예
  - 변환 전
  ```javascript
  function App() {
    return (
      <div>
        Hello <b>react</b>
      </div>
    );
  }
  ```
  - 변환 후
  ```javascript
  function App() {
    return React.createElement(
      "div",
      null,
      "Hello",
      React.createElement("b", null, "react")
    );
  }
  ```

## 장점

- 보기 쉽고 익숙하다
- 더욱 높은 활용도 (HTML 뿐만 아니라 컴포넌트들도 JSX안에서 작성할 수 있음)

## 문법

- ReactDom.render(JSX, 해당 JSX를 렌더링할 document 내부 요소)
- **컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나로 감싸야 함**
- 리액트 v16 이상 부터 도입된 Fragment로 감싸는 것도 가능

```HTML
<Fragment></Fragment> 또는 <></>;
```

- JSX 안에서 자바스크립트 표현식을 쓰려면 {}
- if문 대신 조건부 연산자 JSX 밖에서 if 문을 사용하여 사전에 값을 설정하거나 { } 안에 조건부 연산자(삼항) 사용
- class 적용은 classNmae으로
- css는 카멜케이스
- br과 input 태그 열기만 하고 닫지 않으면 오류 발생
- 주석은 {/_ 이런식으로 입력 _/} 또는 시작 태그가 여러 줄이 되면 // 주석 가능

---

## ESLint 문법 검사 도구

- 코드를 작성할 때 실수를 하면 에러 혹은 경고 메시지를 VS Code 에디터에서 바로 확인할 수 있음
- 초록색은 무시 가능, 빨간색은 반드시 고쳐야 됨

## Prettier 코드 스타일 자동 정리 도구

- JSX를 작성할 때는 코드의 가동성을 위해 들여쓰기를 사용
- .prettierrc 파일을 만들어 커스터마이징 가능(세미콜론, 쉼표 등 사용여부)
- 파일 > 기본 설정 > 설정 > Format on save 검색 후 체크
