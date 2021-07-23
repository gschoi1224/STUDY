import * as R from 'ramda';
import { makeRandomIPerson, IPerson } from './model/person';

const person: IPerson = makeRandomIPerson();
const paris: [string, any][] = R.toPairs(person);
console.log('paris', paris);
