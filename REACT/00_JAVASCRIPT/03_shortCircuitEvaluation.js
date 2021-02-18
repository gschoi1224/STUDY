const dog = {
    name: '멍멍이'
};

/*
function getName(animal) {
    return animal.name;
}

const name = getName(dog);
console.log(name); // 멍멍이
console.log(getName()); // Cannot read property 'name' of undefined
*/

function getName(animal) {
    return animal && animal.name;
}

console.log(getName()); //undefined
console.log(getName(dog)); //멍멍이
// A && B 연산자는 A가 Truthy 한 값이라면 B가 결과값이 되고 A가 Falsy한 값이라면 A가 됨

console.log(true && 'hello'); // hello
console.log(false && 'hello'); // false
console.log('hello' && 'bye'); // bye
console.log(null && 'hello'); // null
console.log(undefined && 'hello'); // undefined
console.log('' && 'hello'); // ''
console.log(0 && 'hello'); // 0
console.log('0' && 'hello'); // hello
console.log(1 && 'hello'); // hello
console.log(1 && 1); // 1
console.log(null && undefined); // null

const nameLessDog = {
    name: ''
};

function heyDogWhatsYourName(dog) {
    const name = dog && dog.name;
    return name || '이름이 없는 동물입니다.'; // 만약 A가 Truthy 할 경우는 A Falsy할 경우는 B
}

const dogsName = heyDogWhatsYourName(nameLessDog);
console.log(dogsName);