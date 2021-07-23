import Chance from 'chance';
import { makeRandomILocation } from '../location';
import { IPerson } from './IPerson';
import { makeIPerson } from './makeIPerson';
const c = new Chance();

export const makeRandomIPerson = (): IPerson =>
    makeIPerson(c.name(), c.age(), c.profession(), makeRandomILocation());
