function solution(numbers, target) {
    let answer = 0;
    dfs(0, 0);
    function dfs(i, s) {
        if (i === numbers.length) {
            if (s === target) answer++;
            return;
        }
        dfs(i + 1, s + numbers[i]);
        dfs(i + 1, s - numbers[i]);
    }
    return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3)); // 5
