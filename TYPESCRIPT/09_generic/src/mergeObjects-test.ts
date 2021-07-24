import { mergeObjects } from './mergeObjects';

type INameable = { name: string };
type IAgeable = { age: number };

const nameAndAge: INameable & IAgeable = mergeObjects(
    { name: 'Leonardo' },
    { age: 55 },
);
console.log(nameAndAge); // { name: 'Leonardo', age: 55 }
