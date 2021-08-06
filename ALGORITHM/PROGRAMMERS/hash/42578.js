function solution(clothes) {
    let answer = 1;
    const obj = {};
    for (let i = 0; i < clothes.length; i++) {
        obj[clothes[i][1]] = (obj[clothes[i][1]] || 1) + 1;
    }
    for (let k in obj) {
        answer *= obj[k];
    }
    return answer - 1;
}

console.log(
    solution([
        ['yellowhat', 'headgear'],
        ['bluesunglasses', 'eyewear'],
        ['green_turban', 'headgear'],
    ]),
); // 5
console.log(
    solution([
        ['crowmask', 'face'],
        ['bluesunglasses', 'face'],
        ['smoky_makeup', 'face'],
    ]),
); // 3
