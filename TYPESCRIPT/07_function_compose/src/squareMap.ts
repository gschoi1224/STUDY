// @ts-nocheck
import { map } from './map';

const square = value => value * value;
export const squaredMap = map(square); // 굳이 a를 지정하지 않는다
// export const squareMap = a => map(square)(a)
