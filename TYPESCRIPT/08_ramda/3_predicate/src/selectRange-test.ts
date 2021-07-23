// @ts-nocheck

import * as R from 'ramda';
import { selectRange } from './selectRange';

R.pipe(
    R.tap(n => console.log(n)), // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    R.filter(selectRange(3, 6 + 1)),
    R.tap(n => console.log(n)), // [3, 4, 5, 6]
)(R.range(1, 10 + 1));
