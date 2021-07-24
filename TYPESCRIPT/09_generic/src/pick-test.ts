import { pick } from './pick';

const obj = {
    name: 'Leonardo',
    age: 55,
    city: 'Hollywood',
    country: 'U.S.A.',
} as any;
console.log(
    pick(obj, ['name', 'age']), // { name: 'Leonardo', age: 55 }
    pick(obj, ['nam', 'egg']), // { nam: undefined, agge: undefined }
);
