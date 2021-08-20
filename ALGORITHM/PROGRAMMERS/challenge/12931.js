const solution = n =>
    n
        .toString()
        .split('')
        .reduce((acc, cur) => acc + Number(cur), 0);

console.log(solution(123)); // 6
console.log(solution(987)); // 24
