# REACT-REDUX

## 작업 환경 설정
> $ yarn add redux react-redux

## UI 준비하기
- 리덕스를 사용할 때 가장 많이 사용하는 패턴은 프레젠테이셔널 컴포넌트(상태 관리 없이 props를 받아 와 UI를 보여 주기만 하는 컴포넌트)와 컨테이너 컴포넌트(리덕스와 연동되어 있는 컴포넌트)를 분리하는 것
- 코드의 재사용성도 높아지고, 관심사의 분리가 이루어져 UI를 작성할 때 좀 더 집중할 수 있음
- UI에 관련된 프레젠테이셔널 컴포넌트는 src/components 경로로, 리덕스와 연동된 컨테이너 컴포넌트는 src/containers 폴더에 작성함

## 리덕스 관련 코드 작성하기
- 리덕스 코드 작성하는 스타일
    - actions, constants, reducers라는 세 개의 디렉터리를 만들고 그 안에 기능별로 파일을 하나씩 만들기(새로운 액션을 만들 때마다 세 종류의 파일을 모두 수정해야 하기 때문에 불편하기도 하지만 리덕스 공식 문서에서도 사용되므로 가장 기본적이라 할 수 있음)
    - 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식으로 **Ducks 패턴**이라고 부르며, 위의 구조에 불편함을 느낀 개발자들이 자주 사용
- Ducks 패턴 사용 방법
    1. counter 모듈 작성하기
        - 액션 타입, 액션 생성 함수, 리듀서를 작성한 코드를 '모듈' 이라고 함
        - 액션 타입 정의하기
        ```js
        const INCREASE = 'counter/INCREASE';
        const DECREASE = 'counter/DECREASE';
        ```
        - 액션 타입은 대문자로 정의하고, 문자열 내용은 '모듈 이름/액션 이름'과 같은 형태로 작성 (프로젝트가 커졌을 때의 충돌 방지)
        - 액션 생성 함수 만들기
        ```js
        export const increase = () => ({ type : INCREASE });
        export const decrease = () => ({ type : DECREASE });
        ```
        - 초기 상태 및 리듀서 함수 만들기
        ```js
        const initialState = {  // 초기 상태
            number : 0
        };
        function counter (state = initialState, action) {   // 리듀서 함수
            switch (action.type) {
                case INCREASE :
                    return {
                        number : state.number + 1
                    };
                case DECREASE :
                    return {
                        number : state.number * 1
                    };
                default :
                    return state;
            }
        }
        export default counter;
        ```
        - 리듀서 함수는 export default(하나만 가능) 로 내보내 주고, 액션 생성 함수는 export로 내보내 줌 
    2. todos 모듈 만들기
        - 액션 타입 정의하기
        ```js
        const CHANGE_INPUT = 'todos/CHANGE_INPUT';  // 인풋 값을 변경함
        const INSERT = 'todos/INSERT';  // 새로운 todo를 등록함
        const TOGGLE = 'todos/TOGGLE';  // todo를 체크/체크 해제 함
        const REMOVE = 'todos/REMOVE';  // todo를 제거함
        ```
        - 액션 생성 함수 만들기
        ```js
        export const changeInput = input => ({
            type : CHANGE_INPUT,
            input
        });
        let id = 3; // insert가 호출될 때마다 1씩 더해짐
        export const insert = text => ({
            type : INSERT,
            todo : {
                id : id++.
                text,
                done : false
            }
        });
        ```
        - 초기 상태 및 리듀서 함수 만들기
        ```js 
        const initialState = ...
        function todos(state = initialState, action) {
            switch(action.type) {
                ...
            }
        }
        ```
    3. 루트 리듀서 만들기
        - createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 하므로 기존에 만들었던 리듀서를 하나로 합쳐 주어야 함
        - 리덕스에서 제공하는 combineReducers라는 유틸 함수를 사용하면 쉽게 처리할 수 있음
        ```js
        import { combineReducers } from 'redux';
        const rootREducer = combineReducers({
            counter,
            todos,
        });
        ```
        - 파일명을 index.js로 설정하여 `import rootReducer from './modules`처럼 디렉터리 이름까지만 입력하여 불러올 수 있게 하자

## 리액트 애플리케이션에 리덕스 적용하기
1. 스토어 만들기
    - src/index.js 에 스토어 생성하기
    ```js
    import { createStore } from 'redux';
    import rootReducer from './modules';

    const store = crateStore(rootReducer);
    ```
2. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용하기
    - 리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 react-redux에서 제공하는 Provider 컴포넌트로 감싸 주기(store를 props를 전달해야 함)
    ```js
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
    ```
3. Redux DevTools의 설치 및 적용
    - 크롬 확장 프로그램에서 Redux DevTools를 검색하여 설치
    - yarn add redux-devtools-extension -- 패키지 설치
    - index.js에 적용
    ```js
    import { composeWithDevTools } from 'redux-devtools-extension';
    const store = createStore(rootReducer, composeWithDevTools());
    ```
    - 크롬 개발자 도구의 Redux 탭에서 State 버튼을 눌러 리덕스 스토어 내부의 상태를 볼 수 있음!

## 컨테이너 컴포넌트 만들기
1. CounterContainer 만들기
    - 컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 **connect** 함수를 사용해야 함.
    ```js
    const mapStateToProps = state => ({ // 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
        number : state.counter.number,
    });
    const mapDispatchToProps = dispatch => ({   // 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위한 함수로 store의 내장 함수 dispatch를 파라미터로 받아옴
        increase : () => {...},
        decrease : () => {...}
    });
    export default connect(mapStateToProps, mapDispatchToProps,)(CounterContainer);
    ```
    - 액션 생성 함수를 불러와서 액션 객체를 만들고 디스패치해 주기
    ```js
    import { increase, decrease } from '../modules/counter'
    const mapDispatchToProps = dispatch => ({
        increase : () => {
            dispatch(increase());
        }
        ...
    })
    ```
    - mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용해도 되지만 취향에 따라 익명 함수 형태로 사용해도 됨
    ```js
    export default connect(
        state => ({
            number : state.counter.number,
        }),
        dispatch => ({
            increase : () => dispatch(increase()),
            decrease : () => dispatch(decrease())
        }),
    )(CounterContainer);
    ```
    - 리덕스에서 제공하는 bindActionCreators 유틸 함수를 사용해 간단히 만들기
    ```js
    export default connect(
        state => ({
            number : state.counter.number,
        }),
        dispatch => bindActionCreators(
            {
                increase, decrease,
            },
            dispatch,
        ),
    )(CounterContainer);
    ```
    - mapDispatchToProps에 해당하는 파라미터를 함수 형태가 아닌 액션 생성 함수로 이루어진 객체 형태로 넣어주기(connect 함수가 내부적으로 bindActionCreators 작업을 대신해 줌)
    ```js
    export default connect(
        state => ({
            number : state.counter.number,
        }),
        {
            increase,
            decrease,
        },
    )(CounterContainer);
    ```
2. TodosContainer 만들기
    - connect 함수를 사용하고, mapDisatchToProps를 짧고 간단하게 쓰는 방법을 적용해 코드 작성하기
    - todos 모듈에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달해 주기
    - App.js에서 보여 주던 Todos 컴포넌트를 TodosContainer 컴포넌트로 교체하기
    - Todos 컴포넌트에서 받아 온 props를 사용하도록 구현하기
    
## 리덕스 더 편하게 사용하기
### redux-actions
- 액션 생성 함수를 더 짧은 코드로 작성할 수 있게 도와줌
> yarn add redux-actions
- counter 모듈에 작성된 액션 생성 함수를 createAction이란 함수를 사용하여 변경해주기
```js
export const increase = createAction(INCREASE);
```
- 리듀서 함수도 handleAcctions라는 함수를 이용해 간단히 변경해주기
```js
const counter = handleActions(
    {
        [INCREASE] : (state, action) => ({ number : state.number + 1 }),
        [DECREASE] : (state, action) => ({ number : state.number - 1 }),
    }
)
```
- todos 모듈에서는 액션 생성 함수에서 파라미터를 필요로 하기 때문에 createAction의 두 번째 인수로 payload(액션에 필요한 추가 데이터)를 정의하는 함수를 따로 선언해 넣어주기
```js
export const changeInput = createAction(CHANGE_INPUT, input => input);  // 함수 생략하고 그냥 input으로 해도 됨
```
- createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라 action.payload라는 이름을 공통적으로 넣어 주게 되므로 기존의 업데이트 로직에서도 모두 action.payload 값을 조회하여 업데이트하도록 구현해주기
```js
const todos = handleActions(
    {
        [CHANGE_INPUT] : (state, action) => ({ ...state, input : action.payload }),
        [TOGGLE]] : (state, action) => ({ ...state, todos : state.todos.map(todo => todo.id === action.payload ? { ...todo, done : !todo.done } : todo) }),
        ...
    }
)
```
### immer 
- counter 모듈처럼 간단한 리듀서에 적용하기보다 todos 모듈처럼 복잡한 모듈에 적용하는게 좋음
```js
import produce from 'immer';
const todos = handleActions(
    {
        [CHANGE_INPUT] : (state, { payload : input }) => produce(state, draft => { draft.input = input; }),
        [INSERT] : (state, { payload : todo }) => produce(state, draft => { draft.todos.push(todo) }),
        [TOGGLE] : (state, { payload : id }) => produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
        }),
        [REMOVE] : (state, { payload : id }) => produce(state, draft => {
            const index = draft.todos.findIndex(todo => todo.id === id);
            draft.todos.splice(index, 1);
        }),
        initialState,
    }
)
```
## Hooks를 사용하여 컨테이너 컴포넌트 만들기
1. useSelector로 상태 조회하기
    - useSelector Hook을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있음
    - 여기서 상태 선택 함수는 mapStateToProps와 형태가 똑같음
    ```js
    import { useSelector } from 'react-redux';
    const CounterContainer = () => {
        const number = useSelector(state => state.counter.number);
        return <Counter number={number}>
    }
    ```
2. useDispatch를 사용하여 액션 디스패치하기
    - 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해 줌
    ```js
    import { useDispatch } from 'react-redux';
    const CounterContainer = () => {
        const dispatch = useDispatch();
        return (
            <Counter number={number} onIncrease={() => dispatch(increase())} onDecrease={() => dispatch(decrease())}>
        )
    }
    ```
    - 이렇게 하면 숫자가 바뀌어서 컴포넌트가 리렌더링될 때마다 onIncrease 함수와 onDecrease 함수가 새롭게 만들어짐
    - 컴포넌트 성능을 최적화해야 하는 상황이 온다면 useCallback으로 액션을 디스패치하는 함수를 감싸 주는 것이 좋음
    ```js
    const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
    ```
3. useStore를 사용하여 리덕스 스토어 사용하기
    - 컴포넌트 내부에서 리덕스 스토어 객체를 직접 사용할 수 있게 해 줌
    - 정말 어쩌다가 스토어에 직접 접근해야 하는 상황에만 사용해야 함
    ```js
    const store = useStore();
    store.dispatch({ type:'SAMPLE_ACTION' });
    store.getState();
    ```