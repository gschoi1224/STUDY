function solution(n, edge) {
    const INF = 20001;
    const answer = new Array(n + 1).fill(INF);
    const q = [[1, 0]];
    answer[1] = 0;
    answer[0] = 0;
    let MAX = 0;
    while (q.length > 0) {
        const [now, cost] = q.shift();
        MAX = Math.max(cost, MAX);
        edge.forEach(([a, b]) => {
            if (b === now && answer[a] > cost + 1) {
                q.push([a, cost + 1]);
                answer[a] = cost + 1;
            }
            if (a === now && answer[b] > cost + 1) {
                q.push([b, cost + 1]);
                answer[b] = cost + 1;
            }
        });
    }

    return answer.filter(a => MAX === a).length;
}

console.log(
    solution(20000, [
        [3, 6],
        [4, 3],
        [3, 2],
        [1, 3],
        [1, 2],
        [2, 4],
        [5, 2],
    ]),
); // 3
