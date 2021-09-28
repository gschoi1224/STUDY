import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import axios from 'axios';
import { getTodosAPI } from './api/todos';

const todos = [];

type propType = {
    data: TodoType[];
};
const index: NextPage<propType> = ({ data }) => {
    return <TodoList todos={data} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await getTodosAPI();
        return { props: { data } };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
};

export default index;
