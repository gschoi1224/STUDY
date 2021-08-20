const solution = (x, n) =>
    Array(n)
        .fill(0)
        .map((_, i) => x * (i + 1));
console.log(solution(2, 5)); // [2,4,6,8,10]
console.log(solution(4, 3)); // [4,8,12]
console.log(solution(-4, 2)); // [-4,-8]
