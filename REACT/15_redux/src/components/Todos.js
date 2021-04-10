import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input type='checkbox' onClick={() => onToggle(todo.id)} checked={todo.done} readOnly={true}/>
            <span style={{textDecoration : (todo.done ? 'line-through' : 'none')}}>{todo.text}</span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
};

const Todos = ({
    input,  // input에 입력되는 텍스트
    todos, // 할 일 목록에 들어 있는 객체
    onChangeInput, onInsert, onToggle, onRemove, }) => {
        console.log(todos);
        const onSubmit = e => {
            e.preventDefault();
            onInsert(input);
            onChangeInput('');  // 등록 후 인풋 초기화
        }; 
        const onChange = e => onChangeInput(e.target.value);
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input type='text' onChange={onChange} value={input}/>
                    <button type='submit'>등록</button>
                </form>
                <div>
                    {todos.map(todo => (
                        <TodoItem key={todo.id} onToggle={onToggle} todo={todo} onRemove={onRemove}/>
                    ))}
                </div>
            </div>
        );
};

export default Todos;