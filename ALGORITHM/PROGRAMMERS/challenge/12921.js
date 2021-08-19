function solution(n) {
    const dp = new Array(n + 1).fill(true);
    dp[0] = false;
    dp[1] = false;
    let i = 2;
    while (i < n) {
        if (dp[i]) {
            for (let k = 2; k * i <= n; k++) {
                dp[k * i] = false;
            }
        }
        i++;
    }
    return dp.filter(d => d).length;
}

console.log(solution(10)); // 4
console.log(solution(5)); // 3
