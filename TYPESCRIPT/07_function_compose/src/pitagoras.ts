import { pipe } from './pipe';
import { squaredMap } from './squareMap';
import { sumArray } from './sumArray';

const pitagoras = pipe(squaredMap, sumArray, Math.sqrt);

console.log(pitagoras([3, 4])); // 5
