function solution(left, right) {
    var answer = 0;
    const dp = new Array(right + 1).fill(0);
    let i = 1;
    while (i < dp.length) {
        for (let k = 1; k * i < dp.length; k++) {
            dp[i * k] += 1;
        }
        i++;
    }
    for (let j = left; j <= right; j++) {
        if (dp[j] % 2 === 0) answer += j;
        else answer -= j;
    }
    return answer;
}

console.log(solution(13, 17)); // 43
console.log(solution(24, 27)); // 32

// Number.isInteger(Math.sqrt(i)) 제곱근이 정수이면 약수의 개수가 홀수!
