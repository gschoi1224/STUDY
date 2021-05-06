import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules/index';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    window.__PRELOAD_STATE__, // 이 값을 초기 상태로 사용함
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return; // 로그인 상태가 아니라면 아무것도 안 함

        store.dispatch(tempSetUser(JSON.parse(user)));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser(); // 반드시 sagaMiddleware 다음에

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    );
};

const root = document.getElementById('root');

// 프로덕션 환경에서는 loadableReady와 hydrate를 사용하고
// 개발 환경에서는 기존 방식으로 처리
if (process.env.NODE_ENV === 'production') {
    loadableReady(() => {
        ReactDOM.hydrate(<Root />, root);
    });
} else {
    ReactDOM.render(<Root />, root);
}
