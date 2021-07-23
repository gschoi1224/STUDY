import * as R from 'ramda';

const left = { name: 'Leonardo' },
    right = { name: 'Dicaprio', age: 52 };
const person = R.mergeLeft(left, right);
console.log(person); // {name: 'Leonardo', age: 52}
