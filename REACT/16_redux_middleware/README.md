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
