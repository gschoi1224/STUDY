import axios from 'axios';
import fs, { readFileSync, writeFileSync } from 'fs';
import { TodoType } from '../../types/todo';

// 투두리스트 데이터 불러오기
const getList = () => {
    const todosBuffer = readFileSync('./data/todos.json');
    const todoString = todosBuffer.toString();
    if (!todoString) {
        return [];
    }
    const todos: TodoType[] = JSON.parse(todoString);
    return todos;
};

// id의 투두가 있는지 확인하기
const exist = ({ id }: { id: number }) => {
    const todos = getList();
    const todo = todos.some(todo => todo.id === id);
    return todo;
};

// 투두리스트 저장하기
const write = async (todos: TodoType[]) => {
    writeFileSync('./data/todos.json', JSON.stringify(todos));
};

// 투두 추가하기 API Body
interface AddTodoAPIBody {
    text: string;
    color: TodoType['color'];
}

// Todo 추가하기 API
export const addTodoAPI = (body: AddTodoAPIBody) =>
    axios.post('/api/todos', body);

// Todo 삭제하기 API
export const deleteTodoAPI = (id: number) => axios.delete(`/api/todos/${id}`);

export default { getList, exist, write };
