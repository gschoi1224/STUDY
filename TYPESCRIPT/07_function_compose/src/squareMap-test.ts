import { pipe } from './pipe';
import { squaredMap } from './squareMap';

const fourSquare = pipe(squaredMap, squaredMap);
console.log(fourSquare([3, 4])); // [81, 256]
