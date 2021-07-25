// @ts-nocheck

import { IFunctor } from './IFunctor';
import { IValuable } from './IValuable';
import { nullable } from './nullable';

export class None implements IValuable<nullable>, IFunctor<nullable> {
    getOrElse<T>(defaultValue: T | nullable) {
        return defaultValue;
    }
    map<U>(fn: (T) => U) {
        return new None();
    }
}
