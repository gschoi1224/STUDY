import { pipe } from './pipe';
import { f, g, h } from './f-g-h';

const piped = pipe(f, g, h);
console.log(piped('x')); // h(g(f(x)))
