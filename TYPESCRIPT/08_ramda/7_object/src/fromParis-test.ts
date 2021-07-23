import * as R from 'ramda';
import { IPerson, makeRandomIPerson } from './model/person';

const paris: [string, any][] = R.toPairs(makeRandomIPerson());
const person: IPerson = R.fromPairs(paris) as IPerson;
console.log('person:', person);
