import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../types/todo';

// 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야 함
// 액션 타입 정의
export const SET_TODO_LIST = 'todo/SET_TODO_LIST';

// 2. 항상 모듈의 action 생성자들을 함수형태로 export 해야 함
// 액션 생성자 정의
export const setTodo = (payload: TodoType[]) => {
    return {
        type: SET_TODO_LIST,
        payload,
    };
};

interface TodoReduxState {
    todos: TodoType[];
}

// 초기 상태
const initialState: TodoReduxState = {
    todos: [],
};

const todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // 투두 변경하기
        setTodo(state, action: PayloadAction<TodoType[]>) {
            state.todos = action.payload;
        },
    },
});

export const todoActions = { ...todo.actions };

// 1. 항상 reducer()란 이름의 함수를 export default 해야 함
// 리듀서
// export default function reducer(state = initialState, action: any) {
//     switch (action.type) {
//         case SET_TODO_LIST:
//             const newState = { ...state, todos: action.payload };
//             return newState;
//         default:
//             return state;
//     }
// }

export default todo;
