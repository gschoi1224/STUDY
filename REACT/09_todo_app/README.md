# 일정관리 애플리케이션

## UI 구성

- TodoTemplate : 화면을 가운데에 정렬시켜주며, 앱 타이틀을 보여줌, children으로 내부 JSX를 props로 받아 와서 렌더링해 줌
- TodoInsert : 새로운 항목을 입력하고 추가할 수 있는 컴포넌트. state를 통해 인풋의 상태를 관리함
- TodoListItem : 각 할 일 항목에 대한 정보를 보여주는 컴포넌트, todo객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여줌
- TodoList : todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 이용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여줌
  컴포넌트들은 src 디렉터리에 components 라는 디렉터리를 생성하여 그 안에 저장(관습)

### 라이브러리 설치

> yarn add node-sass@4.14.1 classnames react-icons(다양한 아이콘 사용 가능 SVG 형태의 아이콘을 리액트 컴포넌트처럼 쉽게 사용할 수 있음)

### prettier 설정

```js
{
    // 프로젝트 최상위 디렉터리에 .prettierrc 파일 생성하고 설정
    'singleQuote' : true,
    'semi' : true,
    'useTabs' : false,
    'tabWidh' : 2,
    'trailingComma' : "all",
    'printWidth' : 80
}
```

## flex 스타일

### justify-content(가로 정렬)

- flex-start(default) : 왼쪽 정렬
- flex-end : 오른쪽 정렬
- center : 가운데 정렬
- space-between : 사이에 동일한 간격을 둠
- space-around : 주위에 동일한 간격을 둠

### align-items(세로 정렬)

- stretch(default) : 컨테이너에 맞도록 요소를 늘림
- baseline : 시작위치에 정렬
- flex-start : 컨테이너의 꼭대기로 정렬
- flex-end : 컨테이너의 바닥으로 정렬
- center : 세로선 상의 가운데로 정렬

### flex-direction(방향 결정)

- row : 텍스트의 방향과 동일하게 정렬
- row-reverse : 텍스트의 반대 방향으로 정렬
- column : 위에서 아래로 정렬
- column-reverse : 아래에서 위로 정렬
  ※ Flex의 방향이 column일 경우 justify-content의 방향이 세로로, align-items의 방향이 가로로 바뀜

### order (순서 결정)

- [integer](-1, 0(default), 1...)

### align-self

- align-items 무시하고 개별 정렬 적용

### flex-wrap(몇 줄에 걸쳐 정렬할 것인지)

- nowrap : 모든 요소들을 한 줄에 정렬
- wrap : 요소들을 여러 줄에 걸쳐 정렬
- wrap-reverse : 요소들을 여러 줄에 걸쳐 반대로 정렬

### flex-flow(flex-direction과 flex-wrap 속성들을 간단히 한 속성)

- [flex-direction] [flex-wrap]

### align-content(여러 줄 사이의 간격을 지정할 수 있음)

- flex-start : 여러 줄들을 컨테이너의 꼭대기에 정렬
- flex-end : 여러 줄들을 컨테이너의 바닥에 정렬
- center : 여러 줄들을 세로선 상의 가운데에 정렬
- space-between : 여러 줄들 사이에 동일한 간격을 둠
- space-around : 여러 줄들 주위에 동일한 간격을 둠
- stretch : 여러 줄들을 컨테이너에 맞도록 늘림
  ※ align-content는 여러 줄들 사이의 간격, align-items는 컨테이너 안에서 어떻게 모든 요소들이 정렬하는지를 지정

  ### flex-grow(Flex Item의 증가 너비 비율을 설정)
  
  - 총 너비 중 해당 아이템의 너비 비율을 설정 총 너비가 400px이고 각 아이템이 flex-grow:1, flex-grow:2, flex-grow:1 이면 각각 너비가 100px, 200px, 100px이 된다

  ### flex-shrink(Flex Item의 감소 너비 비율을 설정)

  ### flex-basis(Flex Item의 공간 배분 전 기본 너비 설정)
  
  - 값이 auto일 경우 width, height 등의 속성으로 Item의 너비를 설정할 수 있음. 숫자를 입력하면 해당 공간이 기본 너비로 설정됨


# 성능 최적화

## 느려지는 원인 분석

- 컴포넌트는 다음과 같은 상황에서 리렌더링이 발생

  1. 자신이 전달받은 props가 변경될 때
  2. 자신의 state가 바뀔 때
  3. 부모 컴포넌트가 리렌더링될 때
  4. forceUpdate 함수가 실행될 때

- App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링됨. 부모 컴포넌트가 리렌더링되었으니
  TodoList 컴포넌트가 리렌더링되고 그 안의 무수한 컴포넌트들도 리렌더링됨

- 수정한 항목은 리렌더링되어야 하는 것이 맞지만 나머지는 리렌더링을 안 해도 되는데 리렌더링이 되고 있음
  리렌더링이 불필요할 때는 리렌더링을 방지해 주어야 함
  -> shouldComponentUpdate 라는 라이프 사이클을 사용하면 됨.
  -> 함수형 컴포넌트에서는 라이프사이클 메서드를 이용할 수 없음.
  -> 대신 React.memo라는 함수를 사용 컴포넌트의 props가 바뀌지 않는다면 리렌더링하지 않도록 설정 export default React.memo(객체)로 감싸줌

- 현재 프로젝트에서 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀜
- onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수를 새로 만듦
- 이렇게 함수가 계속 새로 만들어지는 상황을 방지하는 방법 두 가지

  1. useState의 함수형 업데이트 기능 사용

     - 기존 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어주었음
       setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 쓰는 방법
       ```js
       const [number, setNumber] = useState(0);
       const onIncrease = useCallback(
         () => setNumber((preNumber) => preNumber + 1),
         [],
       );
       ```
       이렇게 하면 useCallback을 사용할 때 두번째 파라미터로 넣는 배열에 number를 넣지 않아도 됨

  2. useReducer 사용
     - useReducer를 사용할 때 원래 두 번째 파라미터에 초기 상태를 넣어 주어야 하지만 두 번째 파라미터에 undefined를 넣고
       세 번째 파라미터에 초기 상태를 만들어 주는 함수를 넣어주면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출됨
       상태를 업데이트 하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있음
       ```js
       function todoReducer(todos, action) {
           switch(action.type) {
               case 'INSERT' : // 새로 추가
               // {type : 'INSERT', todo : {id : 1, text : 'todo', checked : false}}
                   return todos.concat(action.todo);
               case 'REMOVE' : // 제거
               // {type : 'REMOVE', id : 1}
                   return todos.filter(todo => todo.id !== action.id);
               case 'TOGGLE' : // 토글
               // {type : 'REMOVE', id : 1}
                   return todos.map(todo => todo.id === action.id ? { ...todo, checked : !todo.checked } : todo,);
               default :
                   return : todos;
           }
       }
       const App = () => {
           const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
       }
       ```

=> 성능상으로는 두 가지 방법이 비슷하기 때문에 어떤 방법을 선택할지는 취향에 따라~

## 불변성의 중요성

- 기존 데이터를 수정할 때 직접 수정하지 않고, 새로운 배열을 만든 다음에 새로운 객체를 만들어서 필요한 부분을 교체해 주는 방식으로 구현함
- 업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에 React.memo를 사용했을 때 props가 바뀌었는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있음
- 이렇게 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다' 라고 함
  ex)

```js
const array = [1, 2, 3, 4, 5];

const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킴
nextArrayBad[0] = 100;
console.log(array === nextArrayBad); // 완전히 똑같은 배열이기 때문에 true

const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사함
nextArrayGood[0] = 100;
console.log(array === nextArrayGood); // 다른 배열이기 때문에 false

const object = {
  foo: 'bar',
  value: 1,
};
const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킴
nextObjectBad.value = nextObjectBad.value + 1;
console.log(object === nextObjectBad); // 같은 객체이기 때문에 true

const nextObjectGood = {
  ...object, // 기존에 있던 내용을 모두 복사해서 넣음
  value: object.value + 1, // 새로운 값을 덮어 씀
};
console.log(object === nextObjectGood); // 다른 객체이기 때문에 false
```

- 불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못함
- 추가로 전개 연산자(...문법)를 사용하여 객체나 배열 내부의 값을 복사할 때는 얕은 복사를 하게 됨
- 따라서 내부의 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 주어야 함

```js
const todos = [
  { id: 1, checked: true },
  { id: 2, checked: true },
];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextToods[0]); // 아직까지는 똑같은 객체를 가리키고 있기 때문에 true

nextTodos[0] = {
  ...nextTodos[0],
  checked: false,
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```

- 만약 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야 하므로 다음과 같이 해 주어야 함

```js
const nextComplexObject = {
  ...complexObject,
  obejctInside: {
    ...complexObject.objectInside,
    enabled: false,
  },
};
console.log(complexObject === nextComplexObject); // false
console.log(complexObject.objectInsider === nextComplexObject.objectInside); // false
```

## react-virtualized를 사용한 렌더링 최적화

- 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있음
- 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시킴

  1. yarn add react-virtualized 설치
  2. 각 항목의 실제 크기를 px 단위로 알아내기
  3. 리스트를 뿌릴 컴포넌트 수정

  ```js
  import { List } from 'react-virtualized';
  const TodoList = ({ todos, onRemove, onToggle }) => {
    const rowRendere = useCallback(
      ({ index, key, style }) => {
        const todo = todos[index];
        return (
          <TodoListItem
            todo={todo}
            key={key}
            onRemove={onRemove}
            onToggle={onToggle}
            style={style}
          />
        );
      },
      [onRemove, onToggle, todos],
    );
    return (
      <List
        className="TodoList"
        width={512} // 전체 크기
        height={513} // 전체 높이
        rowCount={todos.length} // 항목 개수
        rowHeight={57} // 항목 높이
        rowRenderer={rowRendere} // 항목을 렌더링할 때 쓰는 함수
        list={todos} // 배열
        style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
      />
    );
  };
  ```

  4. 리스트 아이템 수정

  ```js
  const TodoListItem = ({todo, onRemove, onToggle, style} => {
    const { id, text, checked } = todo;

    return (
      <div className='TodoListItem-virtualized' style={style}>  // render 함수에서 기존에 보여 주던 내용을 div로 한 번 감싸고 해당 div에 TodoListItem-virtualized라는 className을 설정하고, props로 받아 온 style을 적용시켜줌
      // TodoListItem-virtualized라는 클래스를 만든 것은 컴포넌트 사이사이에 테두리를 제대로 쳐 주고, 홀수/짝수 번째 항목에 다른 배경 색상을 설정하기 위해서
        <div className='TodoListItem'>
          <div className={cn('checkbox', {checked})}
          onClick={() => onToggle(id)}>
        </div>
      </div>
    )
  })
  ```

  5. 리스트 아이템 사이사이에 테두리를 설정했던 코드 수정

  ```scss
  .TodoListItem-virtualized {
    & + & {
      border-top: 1px solid #dee2e6;
    }
    &:nth-child(even) {
      background: #f8f9fa;
    }
  }
  ```

### 정리

- 리스트와 관련된 컴포넌트를 만들 때 보여 줄 항목이 100개 이상이고 업데이트가 자주 발생한다면, 최적화하기!
