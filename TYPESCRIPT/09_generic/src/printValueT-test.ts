import { IValuable, printValueT } from './printValueT';
import { Valueable } from './Valueable';

printValueT(new Valueable(1)); // 1
printValueT({ value: true }); // true
