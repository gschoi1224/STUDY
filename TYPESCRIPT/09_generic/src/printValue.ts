import { IValuable, Valueable } from './Valueable';

export const printValue = <T>(o: IValuable<T>): void => console.log(o.value);
export { IValuable, Valueable };
