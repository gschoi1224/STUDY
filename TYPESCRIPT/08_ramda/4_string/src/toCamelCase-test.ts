import { toCamelCase } from './toCamelCase';

console.log(
    toCamelCase(' ')('By World'), // byWorld
    toCamelCase('_')('Ni_Hao_World'), // niHaoWorld
);
