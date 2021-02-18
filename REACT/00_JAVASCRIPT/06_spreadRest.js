const slime1 = {
    name: '슬라임'
};

const cuteSlime1 = {
    name: '슬라임',
    attribute: 'cute',
};

const purpleCuteSlime1 = {
    name: '슬라임',
    attribute: 'cute',
    color: 'purple',
};

console.log(slime1);
console.log(cuteSlime1);
console.log(purpleCuteSlime1);

// spread 사용
const slime2 = {
    name: '슬라임'
};

const cuteSlime2 = {
    ...slime2,
    attribute: 'cute'
};

const pinkCuteSlime2 = {
    ...cuteSlime2,
    color: 'pink'
};

console.log(slime2);
console.log(cuteSlime2);
console.log(pinkCuteSlime2);

// 배열에서 사용
const animals = ['개', '고양이', '참새'];
const anotherAnimals = [...animals, '비둘기'];
console.log(animals); // [ '개', '고양이', '참새' ]
console.log(anotherAnimals); // [ '개', '고양이', '참새', '비둘기' ]


// rest !!
// 앞에 적은 값을 제외한 객체 만들고 싶으면
const purpleCuteSlime3 = {
    name: '슬라임',
    attribute: 'cute',
    color: 'purple',
};

const { color, ...cuteSlime } = purpleCuteSlime3;
console.log(color); // purple
console.log(cuteSlime); // { name: '슬라임', attribute: 'cute' }

// 배열에서의 rest
const numbers = [0, 1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;

console.log(one); // 0
console.log(rest); // [ 2, 3, 4, 5, 6 ]
// 비구조화 할당을 통해 원하는 값을 밖으로 꺼내고, 나머지 값을 rest 안에 넣음
// const [..rest , last] 는 안됨


// 함수 파라미터에서의 rest
function sum(a, b, c, d, e, f, g) {
    let sum = 0;
    if (a) sum += a;
    if (b) sum += b;
    if (c) sum += c;
    if (d) sum += d;
    if (e) sum += e;
    if (f) sum += f;
    if (g) sum += g;
    return sum;
}
const result = sum(1, 2, 3, 4, 5, 6); // 파라미터가 7개라 에러가 나야 하지만 일일이 if 문으로 체크해줘서 에러안뜸

function infiniteSum(...rest) {
    // 배열로 만들어짐
    return rest.reduce((acc, cur) => acc + cur, 0);
}
const result2 = infiniteSum(1, 2, 3, 4, 5, 6);
console.log(result2); // 21

// 함수 인자와 spread

// 불--편
const numbers2 = [1, 2, 3, 4, 5, 6];
const result3 = sum(
    numbers[0],
    numbers[1],
    numbers[2],
    numbers[3],
    numbers[4],
    numbers[5]
);
console.log(result3);

const result4 = sum(...numbers);
console.log(result4); // result3 === result4

// 함수에 n 개의 숫자들이 파라미터로 주어졌을 때, 그 중 가장 큰 값을 알아내세요.
function max(...num) {
    let maxVal = 0;
    num.forEach(n => maxVal = n > maxVal ? n : maxVal);
    return maxVal;
}

const result5 = max(1, 2, 3, 4, 10, 5, 6, 7);
console.log(result5);
// 모범답안
function max(...numbers) {
    return numbers.reduce(
        // acc 이 current 보다 크면 결과값을 current 로 하고
        // 그렇지 않으면 acc 가 결과값
        (acc, current) => (current > acc ? current : acc),
        numbers[0]
    );
}