import axios from 'axios';
import { NextApiResponse, NextApiRequest } from 'next';
import Data from '../../../lib/data';

export const checkTodoAPI = (id: Number) => axios.patch(`api/todos/${id}`);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        try {
            const todoId = Number(req.query.id);
            const todo = Data.todo.exist({ id: todoId });
            if (!todo) {
                res.statusCode = 404;
                res.end();
            }
            const todos = await Data.todo.getList();
            const changeTodos = todos.map(todo =>
                todo.id === todoId ? { ...todo, checked: !todo.checked } : todo,
            );
            Data.todo.write(changeTodos);
            res.statusCode = 200;
            res.end();
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.send(e);
        }
    }
    if (req.method === 'DELETE') {
        try {
            const todoId = Number(req.query.id);
            const todo = Data.todo.exist({ id: todoId });
            if (!todo) {
                res.statusCode = 404;
                res.end();
            }

            const todos = Data.todo.getList();
            const filteredTodos = todos.filter(todo => todo.id === todoId);
            Data.todo.write(filteredTodos);
            res.statusCode = 200;
            res.end();
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
};
