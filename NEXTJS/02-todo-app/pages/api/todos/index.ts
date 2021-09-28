import { NextApiRequest, NextApiResponse } from 'next';
import { TodoType } from '../../../types/todo';
import fs from 'fs';
import axios from '../';
import Data from '../../../lib/data';

// 투두리스트 불러오기 API\
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toUpperCase() === 'GET') {
        try {
            const todos = await new Promise<TodoType[]>((resolve, reject) => {
                fs.readFile('./data/todos.json', (err, data) => {
                    if (err) {
                        return reject(err.message);
                    }
                    const todosData = data.toString();
                    if (!todosData) {
                        // todos.json 값이 비어있다면
                        return resolve([]);
                    }
                    const todos = JSON.parse(data.toString());
                    return resolve(todos);
                });
            });
            res.statusCode = 200;
            return res.send(todos);
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.send(e);
        }
    }
    if (req.method === 'POST') {
        const { text, color } = req.body;
        if (!text || !color) {
            res.statusCode = 400;
            return res.send('text 혹은 color 가 없습니다.');
        }
        const todos = Data.todo.getList();
        let todoId: number;
        if (todos.length > 0) {
            // 마지막 투두 id + 1
            todoId = todos[todos.length - 1].id + 1;
        } else {
            todoId = 1;
        }
        const newTodo = {
            id: todoId,
            text,
            color,
            checked: false,
        };

        Data.todo.write([...todos, newTodo]);
        res.statusCode = 200;
        res.end();
    }
    return res.end();
};
