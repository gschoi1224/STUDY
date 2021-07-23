import * as R from 'ramda';

const left = { name: 'Leonardo' },
    right = { name: 'Dicaprio', age: 52 };
const person = R.mergeRight(left, right);
console.log(person); // {name: 'Dicaprio', age: 52}
