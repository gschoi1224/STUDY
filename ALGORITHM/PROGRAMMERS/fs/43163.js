function solution(begin, target, words) {
    var answer = -1;
    if (words.indexOf(target) === -1) return 0;
    words = [begin, ...words];
    const visited = [];
    for (let i = 0; i < words.length; i++) {
        const arr = [];
        for (let k = 0; k <= i; k++) {
            arr.push(false);
        }
        visited.push(arr);
    }
    const graph = [];
    for (let i = 0; i < words.length; i++) {
        const arr = [];
        for (let k = 0; k < words.length; k++) {
            let cnt = 0;
            for (let ii = 0; ii < words[i].length; ii++) {
                if (words[i][ii] !== words[k][ii]) cnt++;
            }
            arr.push(cnt);
        }
        graph.push(arr);
    }
    function bfs(idx, num) {
        if (words[idx] === target) {
            answer = answer === -1 ? num : Math.min(answer, num);
            return;
        }
        graph[idx].forEach((g, i) => {
            if (!visited[idx][i] && !visited[i][idx] && g === 1) {
                visited[idx][i] = true;
                visited[i][idx] = true;
                bfs(i, num + 1);
            }
        });
    }
    bfs(0, 0);
    return answer === -1 ? 0 : answer;
}
console.log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])); // 4
console.log(solution('hit', 'cog', ['cog', 'log', 'lot', 'dog', 'dot', 'hot'])); // 4
