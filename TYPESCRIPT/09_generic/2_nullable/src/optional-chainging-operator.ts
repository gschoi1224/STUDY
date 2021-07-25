// @ts-nocheck
export interface IPerson {
    name: string;
    age: number;
}

let person: IPerson;
// console.log(person.name) // 런타임 오류
console.log(person?.name); // 정상 실행 undefined 반환
