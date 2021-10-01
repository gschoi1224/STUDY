import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import todo from './todo';
import { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useSelector as useReduxSelector,
} from 'react-redux';

// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// 타입 지원되는 커스텀 useSelector 만들기
declare module 'react-redux' {
    interface DefaultRootState extends RootState {}
}

// 리듀서들을 모듈별로 관리하여 combineReducers 를 사용하여 하나로 모음
const rootReducer = combineReducers({
    todo: todo.reducer,
});

// 합쳐진 리듀서에 타입이 "__NEXT_REDUX_WRAPPER_HYDRATE__"인 리듀서를 추가하게 됨
// Hydrate는 서버에서 생성된 리덕스 스토어를 클라이언트에서 사용할 수 있도록 전달해 주는 역할 함
const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydraion
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    }
    return rootReducer(state, action);
};

// 스토어의 타입: 스토어의 타입을 루트 리듀서로부터 얻을 수 있음
export type RootState = ReturnType<typeof rootReducer>;

// 미들웨어 적용을 위한 스토어 enhancer
// 리덕스에서 미들웨어는 액션이 디스패치 되어 리듀서에서 처리하기 전에 사전에 지정된 작업들을 의미함
// const bindMiddleware = (middleware: any) => {
//     if (process.env.NODE_ENV !== 'production') {
//         const { composeWithDevTools } = require('redux-devtools-extension');
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//     return applyMiddleware(...middleware);
// };

// 리듀서와 미들웨어로 리덕스 스토어를 만들어 리턴하게 됨
// App 컴포넌트에서 wrapper로 사용하기 위해 next-redux-wrapper에서 createWrapper를 import 하여 wrapper를 만들었음
const initStore = () => {
    return configureStore({
        reducer,
        devTools: process.env.NODE_ENV !== 'production',
    });
};

export const wrapper = createWrapper(initStore);
