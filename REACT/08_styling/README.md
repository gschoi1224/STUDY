# 스타일링 방식

## 일반 css

- 컴포넌트를 스타일링하는 가장 기본적인 방식

## Sass(Syntactically Awesome Style Sheets)

- 자주 사용되는 CSS 전처리기 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해 줌
- .sass : 중괄호({}), 세미콜론(;) 안 씀

```scss
$front-stack : Helvetica, sans-serif
$primary-color : #333

body
font : 100% $front-stack
color : $primary-color
```

- .scss : 더 많이 씀

```scss
$front-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $front-stack;
  color: $primary-color;
}
```

> yarn add node-sass@4.14.1 -- 설치<br>

- 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)

```scss
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

- 다른 scss 파일을 불러올 때는 @import 구문을 사용
- 라이브러리 불러오기
  > yarn add open-color(매우 편리한 색상 팔레트) include-media(반응형 디자인을 쉽게 만들어줌)<br>
  > @import '~include-media/dist/include-media';<br>
  > @import '~open-color/open-color';

## CSS Module

- 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는 옵션
- [파일이름]_[클래스이름]_[해시값] 형태로 자동으로 만들어줌

```javascript
<div className={`${styles.wrapper} ${styles.inverted}`}></div>
// 또는
<div className={[styles.wrapper, styles.inverted].join(' ')}></div>
```

### classnames 라이브러리

> yarn add classnames (CSS 클래스를 조건부로 설정할 때 매우 유용, CSS Module을 사용할 때 여러 클래스를 적용할 때 매우 편리)

```javascript
import classNames from "classnames";

classNames("one", "two"); // = 'one two'
classNames("one", { two: true }); // 'one two'
classNames("one", { two: false }); // 'one'
classNames("one", ["two", "three"]); // 'one two three'

const myClass = "hello";
classNames("one", myClass, { myCondition: true }); // 'one hello myCondition'
```

- 조건부 클래스를 설정할 때 매우 편함(props 값에 따라 다른 스타일 주기 등)

  ```javascript
  const MyComponent = ({ highlighted, theme }) => {
    <div className={classNames("MyComponent", { highlighted }, theme)}>
      Hello
    </div>;
  };
  ```

- CSS Module과 함께 사용할 때 classnames에 내장되어 있는 bind 함수를 사용하면 클래스를 넣어 줄 때마다 styles.[클래스 이름] 형태를 사용할 필요가 없어 편함. 사전에 미리 styles에서 받아 온 후 사용하게끔 설정해 두고 cs('클래스 이름', '클래스 이름2') 형태로 사용할 수 있음

```javascript
import styles from "./CSSModule.module.css";
const cx = classNames.bind(styles); // 미리 styles에서 클래스를 받아 오도록 설정하고
const CSSModule = () => {
  return <div className={cx("wrapper", "inverted")}></div>;
};
```

## styled-components

- 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해 줌
  > yarn add styled-components 설치
- props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다는 것이 가장 큰 장점
- 스타일을 작성할 때 `을 사용하여 만든 문자열에 스타일 정보를 넣어주는 문법을 Tagged 템플릿 리터럴이라고 부름
  - styled-components를 위해 컴포넌트 내부에 작성한 스타일이 그저 문자열로 간주되어 코드 신택스 하이라이팅(문법에 따라 에디터 폰트 색상을 입히는 작업)이 제대로 이루어지지 않으면 VS Code의 마켓플레이스에서 vscode-styled-components를 검색하여 설치하면 됨

```javascript
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled("input")`
  background: gray;
`;

// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;

// 컴포넌트를 styled의 파라미터에 넣는 경우에는 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어있어야 함
const Sample = ({ className }) => {
  return <div className={className}>Sample</div>;
};
const StyledSample = styled(Sample)`
  font-size: 2rem;
`;
```

### 스타일에서 props 조회하기

- styled-components를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조할 수 있음

```js
const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있음 */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
`;
<Box color="black">(...)</Box>;
```

### props에 따른 조건부 스타일링

- 일반 CSS 클래스를 사용하여 조건부 스타일링을 해야 할 때는 className을 사용하여 조건부 스타일링을 해 왔는데 styled-components에서는 조건부 스타일링을 간단히 props로도 처리할 수 있음

  - Button 컴포넌트

  ```js
  const styled, { css } from 'styled-components';
  /* 단순한 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 함 */
  const Button = styled.button`
    background : white;
    color : black;

    /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
    &:hover {
        background : rgba(255, 255, 255, 0.9);
    }

    // inverted 값이 true일 때 특정 스타일을 부여해 줌
    ${props =>
        props.inverted && css`
            background : none;
            color : white;
        `
    };
  `;
  ```

- Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 props 값을 사용하지 못함
- 만약 조건부 스타일링을 할 때 넣는 여러 줄의 코드에서 props를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 상관없음 (props를 참조한다면 반드시 CSS를 감싸 주어서 Tagged 템플릿 리터럴을 사용해 주어야 함)

### 반응형 디자인

- 브라우저의 가로 크기에 따라 다른 스타일링을 적용하기 위해서는 일반 CSS를 사용할 때와 똑같이 media 쿼리를 사용하면 됨

```js
const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있음 */
  background: ${(props) => props.color || "blue"};
  width: 1024px;
  /* 기본적으로는 가로 크기 1024px이고 가로 크기가 작아짐에 따라 크기를 줄이고 768px 미만이 되면 꽉 채움 */
  @media (max-widtnh: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
```

- styled-components 메뉴얼에서 제공하는 유틸 함수 사용

```js
const sizes = {
  desktop: 1024,
  tablet: 768,
};

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 줌
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, []);

const Box = styled.div`
  ${media.desktop`width : 768px;`}
  ${media.tablet`width : 100%;`};
`;
```
