import { printValue, Valueable } from './printValue';

printValue(new Valueable(1)); // 1
printValue(new Valueable(true)); // true
printValue(new Valueable('hello')); // hello
printValue(new Valueable([1, 2, 3])); // [1, 2, 3]
