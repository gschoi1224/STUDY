import { compose } from './compose';
import { f, g, h } from './f-g-h';

const composedFGH = compose(h, g, f);
console.log(composedFGH('x')); //h(g(f(x)))
