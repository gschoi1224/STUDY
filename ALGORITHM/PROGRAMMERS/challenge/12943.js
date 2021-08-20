function solution(num) {
    let i = 0;
    while (i < 500 && num !== 1) {
        if (num % 2 === 0) num = num / 2;
        else num = num * 3 + 1;
        i++;
    }
    return i === 500 ? -1 : i;
}
console.log(solution(6)); // 8
console.log(solution(16)); // 4
console.log(solution(626331)); // -1
