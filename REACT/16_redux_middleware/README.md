# 미들웨어

리덕스 미들웨어는 액션을 디스패치했을 때 리듀서에 이를 처리하기에 앞서 사전에 지정된 작업들을 실행함. 액션과 리듀서 사이의 중간자
액션 -> 미들웨어 -> 리듀서 -> 스토어
전달받은 액션을 단순히 콘솔에 기록하거나 전달받은 액션 정보를 기반으로 액션을 아예 취소하거나, 다른 종류의 액션을 추가로 디스패치할 수도 있음

## 미들웨어 만들기

-   액션이 디스패치될 때마다 액션의 정보와 액션이 디스패치되기 전후의 상태를 콘솔에 보여주는 로깅 미들웨어 만들기
-   lib/loggerMiddleware.js

```js
const loggerMiddleware = store => next => action => {
    // 미들웨어 기본 구조
};
export default loggerMiddleware;
```

-   미들웨어는 함수를 반환하는 함수를 반환하는 함수. 파라미터로 받아오는 store는 리덕스 스토어 인스턴스를, action은 디스패치된 액션을 가리킴.
-   next 파라미터는 함수 형태이며 store.dispatch와 비슷한 역할을 하지만 next(action)을 호출하면 그다음 처리해야할 미들웨어에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션을 넘겨줌
-   미들웨어 내부에서 store.dispatch를 사용하면 첫 번째 미들웨어부터 다시 처리함. 만약 미들웨어에서 next를 사용하지 않으면 액션이 리듀서에 전달되지 않음 = 무시
-   index.js에 등록

```js
import { applyMiddleware } from 'redux';
import loggerMiddleware from './lib/loggerMiddleware';
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

## redux-logger 사용하기

-   `yarn add redux-logger`로 설치
-   index.js 수정

```js
import { createLogger } from 'redux-logger';
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
```

## 비동기 작업을 처리하는 미들웨어

1.  redux-thunk

    -   비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어. 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해 줌.
    -   Thunk는 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태롤 감싼 것을 의미

    ```js
    // 바로 수행
    const addOne = x => x + 1;
    addOne(1); // 2
    // 미루기
    function addOneThunk(x) {
        const thunk = () => addOne(x);
        return thunk;
    }
    const fn = addOneThunk(1);
    setTimeout(() => {
        const value = fn(); // fn이 실행되는 시점에 연산
        console.log(value);
    }, 1000);
    ```

    -   redux-thunk 라이브러리를 사용하면 thunk 함수를 만들어서 디스패치할 수 있음. 리덕스 미들웨어가 그 함수를 전달받아 store의 disaptch와 getSatae를 파라미터로 넣어서 호출해 줌

    ```js
    const sampleThunk = () => (dispatch, getState) => {
        // 현재 상태를 참조할 수 있고, 새 액션을 디스패치할 수도 있음
    };
    ```

    ### redux-thunk 적용하기

    1.  `yarn add redux-thunk`로 설치
    2.  index.js 수정

    ```js
    import ReduxThunk from 'redux-thunk';
    const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
    ```

    3. Thunk 생성 함수 만들기

    ```js
    // redux-thunk는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환함
    // modules/counter.js
    export const increaseAsync = () => dispatch => {
        setTimeout(() => {
            dispatch(increase());
        }, 1000);
    };
    ```

    4. container에서 호출하던 액션 생성 함수 변경

    ### 웹 요청 비동기 작업 처리하기

    1. Promise 기반 웹 클라이언트 axios 설치하기 ```yarn add axios`
    2. 각 API를 호출하는 함수를 모두 함수화 (가독성 좋아지고 유지보수도 쉬워짐)

    ```js
    // lib/api.js
    import axios from 'axios';
    export const getPost = id => axios.get(url);
    export const getUsers = id => axios.get(url);
    ```

    3. 새로운 리듀서 만들기

    ```js
    // modules/sample.js
    import * as api from '../lib/api';
    // 액션 타입을 한 요청당 세 개씩 만들기
    const GET_POST = 'sample/GET_POST';
    const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
    const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

    //thunk 함수 생성 : 시작, 성공, 실패했을 때 다른 액션을 디스패치
    export const getPost = id => async dispatch => {
        dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림
        try {
            const response = await api.getPost(id);
            dispatch({
                type: GET_POST_SUCCESS,
                payload: response.data,
            }); // 요청 성공
        } catch (e) {
            dispatch({
                type: GET_POST_FAILURE,
                payload: e,
                error: true,
            }); // 에러 발생
            throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
        }
    };
    // 액션 핸들링하고
    // loading이라는 객체를 이용해 요청의 로딩 중 상태를 관리
    ```

    4. 컴포넌트 만들기

        - 유효성 검사를 해 주는 것이 중요함 해당 값이 있는지 로딩중은 아닌지.. 등등

    5. 컨테이너 만들기
        - 첫 렌더링 하고 바로 api 호출해주기
        ```js
        // 함수형의 경우
        useEffect(() => {
            getPost(1);
            getUserS(1);
        }, [getPost, getUsers]);
        // 클래스형의 경우
        componentDidMount() {
            getPost(1);
            getUsers(1);
        }
        ```
    6. app.js에서 컨테이너 렌더링

    7. 리팩토링

        - thunk 함수를 작성하는 것과 로딩 상태를 리듀서에서 관리하는 반복되는 로직을 따로 분리하여 코드의 양을 줄이기

        ```js
        // lib/createRequestThunk.js
        export default function createRequestThunk(type, request) {
            const SUCCESS = `${type}_SUCCESS`;
            const FAILURE = `${type}_FAILURE`;
            return (params) = (async dispatch) => { // 액션 생성 함수 반환하는 것
                dispatch({ type }); // 시작됨
                try {
                    const response = await request(params);
                    dispatch({
                        type: SUCCESS,
                        payload: response.data,
                    }); // 성공
                } catch (e) {
                    dispatch({
                        type: FAILURE,
                        payload: e,
                        error: true,
                    }); // 에러 발생
                    throw e;
                }
            });
        }
        // 사용법 : createRequestThunk('GET_USERS', api.getUsers);
        // modules/sample.js
        export const getPost = createRequestThunk(GET_POST, api.getPost);
        export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
        ```

        - 로딩 상태만 관리하는 리덕스 모듈을 따로 생성하여 관리

        ```js
        // module/loading
        {type : 'loading/START_LOADING', payload : 'sample/GET_POST'}
        -> [action.payload]: true;

        // createRequestThunk에서 사용
        dispatch(startLoading(type));
        dispatch(finishLoading(type));
        ```

2.  reudx-saga : redux-thunk 다음으로 가장 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리. 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙을 작성하여 비동기 작업을 처리할 수 있게 해 줌

    -   다음과 같은 까다로운 상황에서는 redux-saga를 사용하는 것이 유리함
        -   기존 요청을 취소 처리해야 할 때(불필요한 중복 요청 방지)
        -   특정 액션이 발생했을 때 다른 액션을 발생시키거나, API 요청 등 리덕스와 관계없는 코드를 실행할 때
        -   웹소켓을 사용할 때
        -   API 요청 실패 시 재요청해야 할 때

    ### 제너레이터 함수

    -   함수에서 값을 순차적으로 반환할 수 있게 해주고 함수의 흐름을 도중에 멈춰 놓았다가 다시 이어서 진행시킬 수 있는 함수
    -   제너레이터 함수를 만들 때는 function\* 키워드를 사용함

    ```js
    function* generatorFunction() {
        console.log('안녕하세요');
        yield 1;
        console.log('제너레이터 함수');
        yield 2;
        console.log('function*');
        yield 3;
        return 4;
    }
    ```

    -   제너레이터 함수를 호출했을 때 반환되는 객체를 제너레이터라고 부름

    ```js
    const generator = generatorFunction();
    ```

    -   제너레이터가 처음 만들어지면 함수의 흐름은 멈춰 있는 상태. next()가 호출되면 다음 yield가 있는 곳까지 호출하고 다시 함수가 멈춤.
    -   next 함수에 파라미터를 넣으면 제너레이터 함수에서 yield를 사용하여 해당 값을 조회할 수도 있음

    ```js
    function* sumGenerator() {
        console.log('sumGenerator가 만들어졌습니다');
        let a = yield;
        let b = yield;
        yield a + b;
    }
    const sum = sumGenerator();
    sum.next(); // sumGenerator가 만들어졌습니다. {value : undefined, done : false}
    sum.next(1); // {value : undefined, dont : false}
    sum.next(2); // {value : 3, done : true}
    sum.next(); // {value : undefined, done : true}
    ```

    ### 비동기 카운터 만들기

    1. `yarn add redux-saga`로 라이브러리 설치
    2. 리덕스 모듈을 열어서 기존 thunk 함수를 제거하고 \_ASYNC 라는 액션 타입을 선언하고 해당 액션에 대한 액션 생성 함수를 만들고 제너레이터 함수 만들기(사가라고 부름)
    3. 루트 리듀서처럼 루트 사가를 만들어 줌
    4. 스토어에 redux-saga 미들웨어를 적용

    ```js
    // index.js
    import CreateSagaMiddleware from 'redux-saga';
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(logger, ReduxThunk, sagaMiddleware),
    );
    sagaMiddleware.run(rootSaga);
    ```

    ### API 요청 상태 관리하기

    1. sample 리덕스 모듈 수정하기
    2. sampleSaga를 루트 사가에 등록

    ### 알아 두면 유용햔 기능

    1. 사가 내부에서 현재 상태를 조회하는 방법

    ```js
    import { select } from 'redux-saga/effects';
    function* increaseSaga() {
        const number = yield select(state => state.counter); // state는 스토어 상태를 의미함
    }
    ```

    2. 사가가 실행되는 주기를 제한하는 방법

    ```js
    import { throttle } from 'redux-saga/effects';
    export function* counterSaga() {
        // 첫 번째 파라미터 : n초 * 1000
        yield throttle(3000, INCREASE_ASYNC, increaseSaga);
    }
    ```
