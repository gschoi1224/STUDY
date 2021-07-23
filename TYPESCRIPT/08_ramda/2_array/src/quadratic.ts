import { f, exp, square } from './f-using-ramda';

export const quadratic = f(1, 2, 1);
export { exp, square }; // exp와 square를 다시 export 한다
