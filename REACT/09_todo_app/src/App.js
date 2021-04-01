import React, { useCallback, useReducer, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// useReducer 사용
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // {type : 'INSERt', todo : {id : 1, text 'todo', checked : false}}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return false;
  }
}

const App = () => {
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501); // 렌더링되는 정보가 아니고 바뀐다고 해서 리렌더링될 필요도 없기 때문에 ref

  // useState의 함수형 선언 사용할 경우
  // -> const [todos, setTodos] = useState(createBulkTodos);
  // createBulkTodos() 라고 작성하면 리렌더링될 때마다 createBulkTodos 함수가 호출되지만,
  // useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행됨

  // useReducer 사용
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onDelete = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  /*
              useState의 함수형 업데이트
              const onInsert = useCallback(
                // props로 전달해야 할 함수를 만들 때는 useCallback을 사용하여 만드는 것을 습관화하기!
                (text) => {
                  const todo = {
                    id: nextId.current,
                    text,
                    checked: false,
                  };
                  setTodos(todos.concat(todo));
                  nextId.current += 1; // nextId 1씩 더하기
                },
                []
              );

              const onDelete = useCallback((id) => {
                setTodos(todos.filter((todo) => todo.id !== id));
              }, []);

              const onToggle = useCallback((id) => {
                setTodos(
                  todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                  )
                  // 파라미터로 사용된 id 값이 같을 때는 정해 준 규칙대로 checked를 반전해주고 아니면 객체 그대로 반환
                );
              }, []);
              */

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />{' '}
      <TodoList todos={todos} onDelete={onDelete} onToggle={onToggle} />{' '}
    </TodoTemplate>
  );
};

export default App;
