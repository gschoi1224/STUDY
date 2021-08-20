function solution(n, m) {
    let a = 1;
    let b = n * m;
    for (let i = 1; i <= n * m; i++) {
        if (n % i === 0 && m % i === 0) {
            a = Math.max(a, i);
        }
        if (i % n === 0 && i % m === 0) {
            b = Math.min(b, i);
        }
    }
    return [a, b];
}
console.log(solution(3, 12)); // [3,12]
console.log(solution(2, 5)); // [1,10]
