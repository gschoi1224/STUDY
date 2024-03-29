import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/user';
import { UserState } from '../styles/reduxState';

// 초기 상태
const initialState: UserState = {
    id: 0,
    email: '',
    lastname: '',
    firstname: '',
    birthday: '',
    isLogged: false,
    profileImage: '',
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 로그인한 유저 변경하기
        setLoggedUser(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: true };
            return state;
        },
        initUser(state) {
            state = initialState;
            return state;
        },
    },
});

export const userActions = { ...user.actions };

export default user;
