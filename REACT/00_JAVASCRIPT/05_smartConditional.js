// 특정 값이 여러 값중 하나인지 확인해야 할 때
// primitive
function isAnimal(text) {
    return (
        text === '고양이' || text === '개' || text === '거북이' || text === '너구리'
    );
}

console.log(isAnimal('개')); // true
console.log(isAnimal('노트북')); // false

// includes 사용
function isAnimal2(name) {
    const animals = ['고양이', '개', '거북이', '너구리'];
    return animals.includes(name);
}

console.log(isAnimal2('개')); // true
console.log(isAnimal2('노트북')); // false

// arrow function
const isAnimal3 = name => ['고양이', '개', '거북이', '너구리'].includes(name);

console.log(isAnimal3('개')); // true
console.log(isAnimal3('노트북')); // false


// 값에 따라 다른 결과물을 반환해야 할 때
// primitive
function getSound(animal) {
    if (animal === '개') return '멍멍!';
    if (animal === '고양이') return '야옹~';
    if (animal === '참새') return '짹짹';
    if (animal === '비둘기') return '누구쎄용';
    return '....동물 맞소..?';
}

console.log(getSound('개')); // 멍멍!
console.log(getSound('비둘기')); // 누구쎄용
console.log(getSound('지하철')); //....동물 맞소..?

// primitive
function getSound2(animal) {
    switch (animal) {
        case '개':
            return '멍멍!';
        case '고양이':
            return '애옹~';
        case '참새':
            return '짹짹';
        case '비둘기':
            return '누구쎄용';
        default:
            return '....동물 맞소..?';
    }
}

console.log(getSound2('개')); // 멍멍!
console.log(getSound2('비둘기')); // 누구쎄용
console.log(getSound2('지하철')); //....동물 맞소..?

// smart
function getSound3(animal) {
    const sounds = {
        개: '멍멍!',
        고양이: '야옹~',
        참새: '짹짹',
        비둘기: '구구 구구 구구구구구구'
    };
    return sounds[animal] || '.../?';
}
console.log(getSound3('개')); // 멍멍!
console.log(getSound3('비둘기')); // 누구쎄용
console.log(getSound3('지하철')); //....동물 맞소..?

// 값에 따라 실행해야 하는 코드 구문이 다를 경우
function makeSound(animal) {
    const tasks = {
        개() {
            console.log('멍멍');
        },
        고양이() {
            console.log('고양이!');
        },
        비둘기() {
            console.log('구구 구구구구구구ㅜ구국!!!!!!');
        }
    };
    if (!tasks[animal]) {
        console.log('.......??????');
        return;
    }
    tasks[animal]();
}

makeSound('개');
makeSound('고양이');