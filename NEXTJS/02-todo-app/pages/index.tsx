import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import axios from 'axios';
import { getTodosAPI } from './api/todos';
import { wrapper } from '../store';
import { todoActions } from '../store/todo';

const index: NextPage = () => {
    return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () => {
        try {
            const { data } = await getTodosAPI();
            store.dispatch(todoActions.setTodo(data));
            return { props: {} };
        } catch (e) {
            console.log(e);
            return { props: {} };
        }
    },
);

// export const getServerSideProps: GetServerSideProps = async () => {
// try {
//     const { data } = await getTodosAPI();
//     return { props: { todos: data } };
// } catch (e) {
//     console.log(e);
//     return { props: { todos: [] } };
// }
// };

export default index;
