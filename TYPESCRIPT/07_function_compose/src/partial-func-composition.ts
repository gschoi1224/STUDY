import { pipe } from './pipe';

const add =
    (x: number): Function =>
    (y: number): number =>
        x + y;
const inc = add(1);

const add3 = pipe(inc, add(2));
console.log(add3(1)); // 4
