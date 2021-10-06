function solution(n, times) {
    var answer = n * Math.max(...times);
    let end = answer;
    let start = 0;
    while (end > start + 1) {
        const pivot = parseInt((start + end) / 2);
        let cnt = 0;
        times.forEach(t => {
            cnt += parseInt(pivot / t);
        });
        if (cnt >= n) {
            answer = Math.min(answer, pivot);
        }
        if (cnt < n) {
            start = pivot;
        } else {
            end = pivot;
        }
    }
    return answer;
}

console.log(solution(6, [7, 10])); // 28
