import * as R from 'ramda';
import { square } from './quadratic';

const input: number[] = R.range(1, 11);
const squareAfterInc = R.pipe(
    R.inc, // (x + 1)
    R.tap(a => console.log('inc 후', a)),
    square, // (x + 1) ** 2
    R.tap(a => console.log('square 후', a)),
);

const SquareResult = R.pipe(
    R.map(squareAfterInc),
    R.tap(a => console.log('squareAfterInc후', a)), // [4, 9, 16, 25, 36, 49, 64, 81, 100, 121]
)(input);
