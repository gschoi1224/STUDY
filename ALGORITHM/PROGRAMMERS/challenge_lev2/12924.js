function solution(n) {
    var answer = 1;
    for (let i = 1; i <= Math.ceil(n / 2); i++) {
        let sum = 0;
        let num = i;
        while (sum < n) {
            sum += num++;
        }
        if (sum === n) answer++;
    }
    return answer;
}

console.log(solution(15)); // 4
