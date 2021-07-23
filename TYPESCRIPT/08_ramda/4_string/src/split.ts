import * as R from 'ramda';

const words: string[] = R.split(' ')('Hello world Ni Hao!');
console.log(words); // ['Hello', 'world', 'Ni', 'Hao!']
const joined: string = R.join('-')(words);
console.log(joined); // Hello-world-Ni-Hao!
