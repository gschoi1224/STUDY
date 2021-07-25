import { IAddable, IValueProvider, IMultiplyable } from '../interfaces';

export class Calculator
    implements IValueProvider<number>, IAddable<number>, IMultiplyable<number>
{
    constructor(private _value: number = 0) {}
    value(): number {
        return this._value;
    }
    add(value: number): this {
        this._value = this._value + value;
        return this; // 메서드 체인 기능을 구현하기 위해
    }
    multiply(value: number): this {
        this._value = this._value * value;
        return this;
    }
}
