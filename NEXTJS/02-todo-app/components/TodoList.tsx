import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';
import { checkTodoAPI } from '../pages/api/todos/[id]';
import { useRouter } from 'next/dist/client/router';
import { deleteTodoAPI } from '../lib/data/todo';
import { useSelector } from '../store';
import { todoActions } from '../store/todo';
import { useDispatch } from 'react-redux';

const Container = styled.div`
    width: 100%;

    .todo-num {
        margin-left: 12px;
    }

    .todo-list-header {
        padding: 12px;
        border-bottom: 1px solid ${palette.gray};
        position: relative;

        .todo-list-last-todo {
            font-size: 14px;
            margin: 0 0 8px;
            span {
                margin-left: 8px;
            }
        }

        .todo-list-header-colors {
            display: flex;
            .todo-list-header-color-num {
                display: flex;
                margin-right: 8px;
                p {
                    font-size: 14px;
                    line-height: 16px;
                    margin: 0;
                    margin-left: 6px;
                }
                .todo-list-header-round-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
            }
        }
    }
    .todo-list {
        .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 52px;
            border-bottom: 1px solid ${palette.gray};

            .todo-left-side {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                .todo-color-block {
                    width: 12px;
                    height: 100%;
                }
                .checked-todo-text {
                    color: ${palette.gray};
                    text-decoration: line-through;
                }
                .todo-text {
                    margin-left: 12px;
                    font-size: 16px;
                }
            }
        }
    }
    .bg-blue {
        background-color: ${palette.blue};
    }
    .bg-green {
        background-color: ${palette.green};
    }
    .bg-navy {
        background-color: ${palette.navy};
    }
    .bg-orange {
        background-color: ${palette.orange};
    }
    .bg-red {
        background-color: ${palette.red};
    }
    .bg-yellow {
        background-color: ${palette.yellow};
    }

    .todo-right-side {
        display: flex;
        margin-right: 12px;
        svg {
            &:first-child {
                margin-right: 16px;
            }
        }
        .todo-trash-can {
            path {
                fill: ${palette.deep_red};
            }
            cursor: pointer;
        }
        .todo-check-mark {
            path {
                fill: ${palette.deep_green};
            }
            cursor: pointer;
        }
        .todo-button {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid ${palette.gray};
            background-color: transparent;
            outline: none;
        }
    }
`;
const TodoList: React.FC = () => {
    const todos = useSelector(state => state.todo.todos);
    const [localTodos, setLocalTodos] = useState(todos);
    // 객체의 문자열 인덱스 사용을 위한 타입
    type ObjectIndexType = {
        [key: string]: number | undefined;
    };

    // 색상별 todo 개수
    const todoColorNums = useMemo(() => {
        const colors: ObjectIndexType = {};
        localTodos.forEach(todo => {
            colors[todo.color] = colors[todo.color]
                ? colors[todo.color] + 1
                : 1;
        });
        return colors;
    }, [localTodos]);

    const dispatch = useDispatch();
    // 투두 체크하기
    const checkTodo = async (id: number) => {
        try {
            await checkTodoAPI(id);
            const newTodos = todos.map(todo =>
                todo.id === id ? { ...todo, checked: !todo.checked } : todo,
            );
            dispatch(todoActions.setTodo(newTodos));
            console.log('체크하였습니다.');
            // 체크 적용 방법 1(새로고침)
            // router.reload();

            // 체크 적용 방법2(데이터 다시 받기)
            // router.push('/');

            // 체크 적용 방법3 (data를 local로 저장하여 사용하기)
            setLocalTodos(prev =>
                prev.map(todo =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo,
                ),
            );
        } catch (e) {
            console.error(e);
        }
    };

    // Todo 삭제하기
    const deleteTodo = async (id: number) => {
        try {
            await deleteTodoAPI(id);
            const newTodos = localTodos.filter(todo => todo.id !== id);
            dispatch(todoActions.setTodo(newTodos));
            setLocalTodos(newTodos);
            console.log('삭제했습니다.');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <div className="todo-list-header">
                <p className="todo-list-last-todo">
                    남은 TODO<span>{localTodos.length}개</span>
                </p>
                <div className="todo-list-header-colors">
                    {Object.keys(todoColorNums).map((color, index) => (
                        <div className="todo-list-header-color-num" key={index}>
                            <div
                                className={`todo-list-header-round-color bg-${color}`}
                            />
                            <p>{todoColorNums[color]}개</p>
                        </div>
                    ))}
                </div>
            </div>
            <ul className="todo-list">
                {localTodos.map(todo => (
                    <li className="todo-item" key={todo.id}>
                        <div className="todo-left-side">
                            <div
                                className={`todo-color-block bg-${todo.color}`}
                            />
                            <p
                                className={`todo-text ${
                                    todo.checked ? 'checked-todo-text' : ''
                                }`}
                            >
                                {todo.text}
                            </p>
                        </div>
                        <div className="todo-right-side">
                            {todo.checked && (
                                <>
                                    <TrashCanIcon
                                        className="todo-trash-can"
                                        onClick={() => deleteTodo(todo.id)}
                                    />
                                    <CheckMarkIcon
                                        className="todo-check-mark"
                                        onClick={() => {
                                            checkTodo(todo.id);
                                        }}
                                    />
                                </>
                            )}
                            {!todo.checked && (
                                <button
                                    type="button"
                                    className="todo-button"
                                    onClick={() => {
                                        checkTodo(todo.id);
                                    }}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TodoList;
