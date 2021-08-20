const solution = n =>
    Math.pow(Math.trunc(Math.sqrt(n)), 2) === n
        ? Math.pow(Math.sqrt(n) + 1, 2)
        : -1;

console.log(solution(121)); // 144
console.log(solution(50000000000000)); // -1
