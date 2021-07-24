import { IValuable } from './IValuable';

export class Valueable<T> implements IValuable<T> {
    constructor(public value: T) {}
}

export { IValuable };
