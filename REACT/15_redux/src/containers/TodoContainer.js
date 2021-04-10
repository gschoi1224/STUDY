import React from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { toggle, remove, insert, changeInput } from '../modules/todos';

const TodoContainer = ({ input, todos, changeInput, insert, toggle, remove }) => {
    return (
        <Todos input={input} todos={todos} onChangeInput={changeInput} onInsert={insert} onToggle={toggle} onRemove={remove}></Todos>
    )
}

export default connect(
    // 비구조화 할당을 통해 todos를 분리하여 state.todos.input 대신 todos.input 사용
    ({ todos }) => ({
        input : todos.input,
        todos : todos.todos,
    }),
    {
        changeInput,
        insert, 
        toggle,
        remove,
    },
)(TodoContainer);
