// @ts-nocheck
import { ISetoid, IMonad } from '../interfaces';

export class Identity<T> implements ISetoid<T>, IMonad<T> {
    constructor(private _vlaue: T) {}

    // Ivalueable
    value() {
        return this._vlaue;
    }

    // ISetoid
    equals<U>(that: U): boolean {
        if (that instanceof Identity) return this.value() === that.value();
        return false;
    }

    // IFunctor
    map<U>(fn: (x: T) => U) {
        return new Identity<U>(fn(this.value()));
    }

    // IApply
    ap<U>(b: U) {
        const f = this.value();
        if (f instanceof Function) return Identity.of<U>((f as Function)(b));
    }

    static of<T>(value: T): Identity<T> {
        return new Identity<T>(value);
    }

    chain<U>(fn: (T) => U): U {
        return fn(this.value());
    }
}
