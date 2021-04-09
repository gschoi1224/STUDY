# Context API

## Context API 사용법

1. 새 Context 만들기

-   새 Context를 만들 때는 `createContext` 함수를 사용

```js
import { createContext } from 'react';
const ColorContext = createContext({ color: 'black' });
export default ColorContext;
```

2. Consumer 사용하기

-   새 컴포넌트를 만들어서 Context 안에 들어 있는 색상을 보여주기
-   색상을 props로 받아 오는 것이 아니라 ColorContext 안에 들어 있는 Consumer라는 컴포넌트를 통해 색상을 조회
-   Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣어 주는 것 같은 패턴을 Function as a child 혹은 Render Props 라고 함 (컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달하는 것)

```js
return (
    <ColorContext.Consumer>
        {value => (
            <div style={{width : '64px', height : '64px', background : value.color}}> />
        )}
    </ColorContext.Consumer>
)
```

3. App.js에서 Component 렌더링

## Provider

-   Provider를 사용하면 Context의 value를 변경할 수 있음
-   `createContext`함수를 사용해 만든 기본값은 Provider를 사용하지 않았을 때만 사용됨
-   **Provider를 사용할 때는 반드시 value값을 명시해 주어야 함**

```js
return (
    <ColorContext.Provider value={{ color: 'red' }}>
        <div>
            <ColorBox />
        </div>
    </ColorContext.Provider>
);
```

## 동적 Context

1. Context 파일 수정하기

    - Context의 value에는 무조건 상태 값만 있어야 하는 것은 아님. 함수를 전달해 줄 수도 있음
    - ColorProvider 라는 컴포넌트를 새로 작성해 value에 상태는 state로, 함수는 actions로 묶어서 전달
    - Context에서 값을 동적으로 사용할 때 반드시 묶어 줄 필요는 없지만, state와 actions 객체를 따로 분리해 주면 나중에 편함
    - createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시켜 주는게 좋음

    ```js
    const ColorContext = createContext({
     state : {color : 'black', subcolor : 'red'},
     action : {
       setColor = () => {},
       setSubcolor = () => {}
     }
    });
    const ColorProvider = {{ children }} => {
     const [color, setColor] = useState('black');
     const [subColor, setSubcolor] = useState('red');

     const value = {
       state : {color, subcolor},
       actions : {setColor, setSubcolor}
     };
     return (
       <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
     );
    };
    ```

2. 새로워진 Context를 프로젝트에 반영

-   ColorContext.Provider로 사용하던걸 위에 Context 파일에서 export된 ColorProvider로 대체
-   ColorContext.Consumer도 ColorConsumer로 대체

3. 색상 선택 컴포넌트 만들기

-   Context의 actions에 넣어 준 함수를 호출하는 컴포넌트 만들기

```js
<ColorConsumer>
    {({ actions }) => {
        <div style={{ display: 'flex' }}>
            {colors.map(color => (
                <div
                    key={color}
                    style={{
                        background: color,
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                    }}
                    onClick={() => actions.setColor(color)}
                    onContextMenu={e => {
                        e.preventDefault();
                        actions.setSubcolor(color);
                    }}
                />
            ))}
        </div>;
    }}
</ColorConsumer>
```

## Consumer 대신 Hook 또는 static contextType 사용하기

1. useContext Hook 사용하기

-   리액트에 내장되어 있는 Hooks 중에서 useContext 라는 Hook을 사용하면, 함수형 컴포넌트에서 Context를 아주 편하게 사용할 수 있음
-   ColorBox Component 에서 ColorConsumer 태그로 감싸서 actions를 전달받던 걸 useContext Hooks을 통해 간결하게 만들기
-   Hook은 함수형 컴포넌트에서만 사용할 수 있다는 점 주의!

```js
const { state } = useContext(ColorContext);
return (
    <>
        <div
            style={{ width: '64px', height: '64px', background: state.color }}
        />
        <div
            style={{
                width: '32px',
                height: '32px',
                background: state.subcolor,
            }}
        />
    </>
);
```

2. static contextType 사용하기

-   클래스형 컴포넌트에서 Context를 좀 더 쉽게 사용하고 싶다면 static contextType을 정의하는 방법
-   SelectColors 컴포넌트를 클래스형으로 변환하기
