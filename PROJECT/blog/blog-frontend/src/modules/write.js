import { createAction, handleActions } from 'redux-actions';
import { createRequestActionTypes } from '../lib/createRequestSaga';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST'); // 포스트 작성

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
    key,
    value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags,
}));

// 사가 생성

const initialState = {
    title: '',
    body: '',
    tags: [],
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value, // 특정 key 값을 업뎅이트
        }),
    },
    initialState,
);

export default write;
