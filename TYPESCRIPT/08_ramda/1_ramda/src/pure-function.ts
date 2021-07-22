import * as R from 'ramda';

const originalArray: number[] = [1, 2, 3];
const resultArray = R.pipe(
    R.map(R.add(1)),
    R.map(R.multiply(3)),
)(originalArray);

console.log(originalArray, resultArray); // [1, 2, 3] [6, 9, 12]
