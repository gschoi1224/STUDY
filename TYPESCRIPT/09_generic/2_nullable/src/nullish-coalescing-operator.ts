// @ts-nocheck
export type ICoordinates = { longitude: number };
export type ILocation = { country: string; coords: ICoordinates };
export type IPerson = { name: string; location: ILocation };

let person: IPerson;

// 널 병합 연산자를 사용해 기본값으로 0 설정
let longitude = person?.location?.coords?.longitude ?? 0;
console.log(longitude);
