function solution(n) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 1;
    for (let i = 3; i <= n; i++)
        dp[i] = (dp[i - 1] % 1234567) + (dp[i - 2] % 1234567);
    return dp[n] % 1234567;
}

console.log(solution(3)); // 2
console.log(solution(33)); // 5
