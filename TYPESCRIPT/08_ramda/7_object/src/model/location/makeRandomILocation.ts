import { makeRandomCoordinates } from '../coordinates';
import { ILocation } from './ILocation';
import { makeILocation } from './makeILocation';
import Chance from 'chance';
const c = new Chance();

export const makeRandomILocation = (): ILocation =>
    makeILocation(c.country(), c.city(), c.address(), makeRandomCoordinates());
