function solution(priorities, location) {
    var answer = 0;
    const q = priorities.map((v, i) => [v, i]);
    while (q.length > 0) {
        const [v, i] = q.shift();
        if (q.length > 0 && Math.max(...q.map(([a, b]) => a)) > v) {
            q.push([v, i]);
        } else {
            answer++;
            if (i === location) {
                break;
            }
        }
    }
    return answer;
}
console.log(solution([2, 1, 3, 2], 2)); // 1
console.log(solution([1, 1, 9, 1, 1, 1], 0)); // 5
