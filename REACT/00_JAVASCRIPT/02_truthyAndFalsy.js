/*
function print(person) {
    console.log(person.name);
}
*/

const person = {
    name: 'John',
};

print();
// Cannot read property 'name' of undefined

function print(person) {
    if (person === undefined) { // if (!person) 으로 표현 가능 flasy 한 값이기 때문에 (null, undefined, 0, '', NaN)
        console.log('person이 없네용');
        return;
    }
    console.log(person.name);
}

console.log(!undefined);
console.log(!null);
console.log(!0);
console.log(!'');
console.log(!NaN);
// true 모두

let value = { a: 1 };

let truthy = value ? true : false;
console.log(truthy);

truthy = !!value; // !value는 false가 되고 !false가 true가 되어 값이 있는지 체크 가능
console.log(truthy);
if (!!value) {
    console.log('있음');
}