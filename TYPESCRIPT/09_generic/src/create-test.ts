import { create } from './create';

class Point {
    constructor(public x: number, public y: number) {}
}
[
    create(Date, '2020-04-01'), // 현재 날짜
    create(Point, 50, 30), // Point {x: 0, y: 0}
].forEach(s => console.log(s));
