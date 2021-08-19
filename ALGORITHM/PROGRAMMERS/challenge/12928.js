const solution = n =>
    Array(n + 1)
        .fill(0)
        .reduce((acc, _, i) => (n % i === 0 ? acc + i : acc), 0);

console.log(solution(12)); // 28
console.log(solution(5)); // 6
